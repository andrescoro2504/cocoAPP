import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { async } from '@angular/core/testing';
import Swal from 'sweetalert2';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage{

  constructor(
    private userService: UserServiceService,
    private alertCtrl: AlertController,
    private toastCtril: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router
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

  onSubmit(){

    let model: User = {
      use_firstname: this.form.get('firstname').value,
      use_lastname: this.form.get('lastname').value,
      //use_numTelPref: NumTelPref,
      use_numTelPref: "593",
      use_numTelf: this.form.get('numTelefono').value,
      use_email: this.form.get('correo').value,
      use_password: this.form.get('password').value,
      use_picture: "A",
      use_profile: "A",
      use_terminos:true
    }

    this.userService.crearUser(model).subscribe((val) => {
        
      console.log(val);
      
      let resp = val['message'];

      if (resp == undefined) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Ingreso Exito",
          showConfirmButton: false,
          timer: 2500
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: resp,
          showConfirmButton: false,
          timer: 2500
        });
      }

      this.form.reset();

    }, (err: any) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: err,
        showConfirmButton: false,
        timer: 2500
      });
    });
  
  }


  /*
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
  */
}
