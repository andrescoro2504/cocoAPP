import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { UserLogin } from 'src/app/models/user-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

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
    ]),

    password: new FormControl('',
    [Validators.required, 
      Validators.minLength(3),
    ]),
  });


  onSubmit(){

    let model: UserLogin = {
      use_email: this.form.get('correo').value,
      use_password: this.form.get('password').value
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

}
