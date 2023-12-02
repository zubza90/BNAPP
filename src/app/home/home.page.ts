import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { DatabaseService } from '../servicios/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {
  usuario = {
    email: "lalala",
    password: "1234"
  }
   
  listaDeUsuarios =  [];

  constructor(private database:DatabaseService) {}

  ngOninit(){
    this.database.getAll('usuarios').then(firebaseResponse => {
      firebaseResponse.subscribe(listaDeUsuariosRef => {

        this.listaDeUsuarios = listaDeUsuariosRef.map(usuarioRef=>{
          let usuario = usuarioRef.payload.doc.data() as any;
          usuario["id"] = usuarioRef.payload.doc.id;
          return usuario;
        })as any;
        console.log(this.listaDeUsuarios);
      })
    })
  }

  altUsuario(){
    this.database.create('usuarios', this.usuario).then(res =>{
      console.log(res);
    })

  }

}
