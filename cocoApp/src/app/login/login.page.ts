import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(
    private authService: AuthService,
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


  async onSubmit(){
    const loading = await this.loadingCtrl.create({message: 'Ingresando...'});
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
        const alert = await this.alertCtrl.create({message: "Ingeso Fallido!", buttons: ['OK'] });
        await alert.present();
        loading.dismiss();
        
      }
      
    );
  }

}
