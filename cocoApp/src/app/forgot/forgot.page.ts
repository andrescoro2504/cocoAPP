import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage {

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
    ])
  });

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

}
