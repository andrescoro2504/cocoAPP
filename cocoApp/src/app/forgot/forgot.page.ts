import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { UserServiceService } from '../services/user-service.service';
import { UserLogin } from '../models/user-login';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage {

  constructor(
    private userService: UserServiceService,
    private alertCtrl: AlertController,
    private toastCtril: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  form = new FormGroup({
    correo: new FormControl('',
    [Validators.required, 
      Validators.minLength(3),
    ])
  });

  onSubmit(){

    let model: UserLogin = {
      use_email: this.form.get('correo').value,
      use_password: ""
    }

    this.userService.login(model).subscribe((val) => {
        
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
    const loading = await this.loadingCtrl.create({message: 'Enviando Correo...'});
    await loading.present();
    this.authService.login(this.form.value).subscribe(
      //si es exitoso el logeo
      async token => {
        localStorage.setItem('token', token);
        loading.dismiss();
        this.router.navigateByUrl('/create');
      },
      //Si hay un error 
      async () => {
        const alert = await this.alertCtrl.create({message: "Error al enviar!", buttons: ['OK'] });
        await alert.present();
        loading.dismiss();
        
      }
      
    );
  }
  */

}
