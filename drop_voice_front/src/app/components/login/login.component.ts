import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SwaleEnum } from 'src/app/enum/swale-enum';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  public loginForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  authentication(): void
  {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          if (response) {
            const expiresInSeconds = response.user.expiresIn;
            const dateExpiration: Date = new Date();
            dateExpiration.setTime(dateExpiration.getTime() + expiresInSeconds * 1000);

            this.cookieService.set('token', response.user.idToken, dateExpiration);
            this.cookieService.set('id', response.id);

            Swal.fire(SwaleEnum.successFrench, 'Connexion réussi', SwaleEnum.success);
            this.router.navigateByUrl('/home');
          } else {
            Swal.fire(SwaleEnum.warningFrench, 'Email ou mot de passe incorrecte', SwaleEnum.warning);
          }
        },
        error: (error: any) => {
          const errorMessageToShow: string = error.error.message + ' email ou mot de passe incorrecte'

          Swal.fire(SwaleEnum.errorServer, error.error.message ? errorMessageToShow : 'Une erreur est survenue', SwaleEnum.error);
        }
      });
    } else {
      Swal.fire(SwaleEnum.warningFrench, 'Veuillez remplir tous les champs', SwaleEnum.warning);
    }
  }
}
