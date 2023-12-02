import { Injectable } from '@angular/core';
import {  LoadingController, ToastController } from '@ionic/angular'
import {AlertController} from '@ionic/angular'
;

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private alertacontrol:AlertController,
    private loadingController:LoadingController,
    private toastController:ToastController) { }

 async showAlert(msg:string,title:string){
    var alert = await this.alertacontrol.create({cssClass:"alertClass",message:msg,header:title,buttons:['Aceptar']});
    await alert.present();
    return alert;
  }

  async showConfirm(msg:string,botonSi:string,botonNo:string){
    let promise = new Promise<boolean>(async (resolve) =>{
      var alert = await this.alertacontrol.create({cssClass:"", message:msg,buttons:
      [
        {
          text:botonSi,
          handler:() =>{
            resolve(true);
          }
        },
        {
          text:botonNo,
          handler:() =>{
            resolve(false);
          }
       }
    ]
    });
    await alert.present();
  })
  return promise;
 }

 async showLoader(msg:string){
  var loader = await this.loadingController.create(
    {
      cssClass:"loaderClass",
      message:msg,
      translucent:true
    }
    );
    await loader.present();
    return loader;
  }

  async showToast(msg:string, duracion:number = 2000){
    var toast = await this.toastController.create(
      {
        cssClass:"toastClass",
        message:msg,
        duration:duracion,
        position:"bottom",
        color:"dark"
      });
      await toast.present();
      return toast;
  }
  
  
  
  
}