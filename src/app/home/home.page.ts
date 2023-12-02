import { Component } from '@angular/core';
import { DatabaseService } from '../servicios/database.service';

interface Usuario {
  email: string;
  password: string;
  id?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario: Usuario = {
    email: "",
    password: ""
  };

  listaDeUsuarios: Usuario[] = [];

  constructor(private database: DatabaseService) {}

  ngOnInit() {
    this.database.getAll('usuarios').then(firebaseResponse => {
      firebaseResponse.subscribe(listaDeUsuariosRef => {
        this.listaDeUsuarios = listaDeUsuariosRef.map(usuarioRef => {
          const usuario = usuarioRef.payload.doc.data() as Usuario;
          usuario.id = usuarioRef.payload.doc.id;
          return usuario;
        });
        console.log(this.listaDeUsuarios);
      });
    });
  }

  eliminar(id?: string | undefined) {
    this.database.delete('usuarios', id).then(res => {
      alert("Se eliminó con éxito");
    }).catch(err => {
      console.log("ERROR al eliminar ", err);
    });
  }

  altUsuario() {
    this.database.create('usuarios', this.usuario).then(res => {
      console.log(res);
    });
  }

  editarUsuario(usuario: Usuario) {
    this.usuario = { ...usuario }; 
  }

  modificarUsuario() {
    const updatedData: Usuario = { ...this.usuario }; 
    const idToUpdate = updatedData.id; 

    if (!idToUpdate) {
      console.log("El usuario no tiene ID.");
      return;
    }

    delete updatedData.id; 

    this.database.update('usuarios', idToUpdate, updatedData)
      .then(() => {
        alert("Se actualizó con éxito");
      })
      .catch(err => {
        console.log("ERROR al modificar ", err);
      });
  }
}
