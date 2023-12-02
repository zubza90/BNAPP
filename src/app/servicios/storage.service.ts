import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Preferences } from '@capacitor/preferences';
import { HelperService } from './helper.service';


const keyStorageUser = "usuarioData";
const keyStorageAsistencia = "asistenciaData";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  public correoUsuario:string = "";
  pelmazos:any;

  constructor(private authFire:AngularFireAuth,
              private servicio:HelperService) { }

  async getItem(llave:string):Promise<string | null>{
    const obj = await Preferences.get({key:llave});
    return obj.value;
  }


  async setItem(llave:string, valor:string){
    await Preferences.set({key:llave, value:valor});
  }


  async obtenerUsuario(){
    const usuarios = await this.getItem(keyStorageUser);
    
    if(usuarios == null){
      return [];
    }

    const users = JSON.parse(usuarios)

   if(users){
      return users
    }
    else{
      return[];
    }
  }

  async guardarUsuario(usuario:any[]){
    const userStorage = await this.obtenerUsuario();
    for(const i of userStorage){
      if(i){
        usuario.push(i);
      }
    }
    this.setItem(keyStorageUser,JSON.stringify(usuario))

  }
}