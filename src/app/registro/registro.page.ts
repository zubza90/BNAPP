import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/servicios/helper.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from 'src/app/servicios/storage.service';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 

interface Usuario {
  email: string;
  password: string;
  nombre: string; 
  
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  usuario: Usuario = {
    email: "",
    password: "",
    nombre: ""
    
  };

  constructor(
    private router: Router,
    private servicio: HelperService,
    private auth: AngularFireAuth,
    private storage: StorageService,
    private firestore: AngularFirestore 
  ) { }

  async onRegister() {
    const loader = await this.servicio.showLoader("Registrando...");

    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(this.usuario.email, this.usuario.password);
      
     
      await this.firestore.collection('usuarios').doc(userCredential.user?.uid).set({
        email: this.usuario.email,
        nombre: this.usuario.nombre 
        
      });
      
      this.storage.correoUsuario = this.usuario.email;
      await loader.dismiss();
      await this.router.navigateByUrl('/home');
    } catch (error: any) {
      await loader.dismiss();
      this.servicio.showAlert("Error al registrarse: " + error.message, "Error");
    }
  }
}
