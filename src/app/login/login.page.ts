import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { HelperService } from 'src/app/servicios/helper.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string=""
  password: string=""


  constructor(private router: Router,
              private servicio:HelperService,
              private auth:AngularFireAuth,
              private storage:StorageService
              ) { }

  ngOnInit() {
    this.servicio.showToast("Ingresa tus creedenciales para ingresar...");
  }
  
  async onLogin() {
    const loader = await this.servicio.showLoader("Cargando");
  
    if (this.usuario === "") {
      await loader.dismiss();
      this.servicio.showAlert("Debe ingresar un usuario", "Error");
      return;
    }
  
    if (this.password === "") {
      await loader.dismiss();
      this.servicio.showAlert("Debe ingresar una contraseña", "Error");
      return;
    }
  
    try {
      await this.auth.signInWithEmailAndPassword(this.usuario, this.password);
      this.storage.correoUsuario = this.usuario;
      await loader.dismiss();
      await this.router.navigateByUrl('/home'); 
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') {
        await loader.dismiss();
        await this.servicio.showAlert("El correo no es el correcto.", "Error");
      }
      if (error.code === 'auth/weak-password') {
        await loader.dismiss();
        await this.servicio.showAlert("El largo de la contraseña es muy corto.", "Error");
      }
    }
  }
  

}