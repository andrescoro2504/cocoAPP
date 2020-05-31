import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage{

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtril: ToastController,
    private loadingCtrl: LoadingController,
  ) { }

  form = new FormGroup({
    firstname: new FormControl('',[
      Validators.required, Validators.minLength(3),
    ]),
    
    lastname: new FormControl('',
    [Validators.required, 
      Validators.minLength(3),
    ]),

    correo: new FormControl('',
    [Validators.required, 
      Validators.minLength(3),
    ]),

    password: new FormControl('',
    [Validators.required, 
      Validators.minLength(3),
    ]),

    numTelefono: new FormControl('',
    [Validators.required, 
      Validators.minLength(3),
    ]),
  });

  async onSubmit(){
    const loading = await this.loadingCtrl.create({message: 'Registrando...'});
    await loading.present();
    this.authService.register(this.form.value).subscribe(
      //si es exitoso
      async () => {
        const toast = await this.toastCtril.create({message: 'Usuario Creado', duration: 2000, color: 'dark' })
        await toast.present();
        loading.dismiss();
        this.form.reset();
      },
      //Si hay un error 
      async () => {
        const alert = await this.alertCtrl.create({message: "Se produjo un error", buttons: ['OK'] });
        loading.dismiss();
        await alert.present();
        
      }
      
    );
  }
}
