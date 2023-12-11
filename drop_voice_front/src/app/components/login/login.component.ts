import Swal from 'sweetalert2';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  authentication() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          if (response) {
            const expiresInSeconds = response.user.expiresIn;
            const dateExpiration: Date = new Date();
            dateExpiration.setTime(dateExpiration.getTime() + expiresInSeconds * 1000);

            this.cookieService.set('token', response.user.idToken, dateExpiration);
            this.cookieService.set('id', response.id);
            console.log(response)
            Swal.fire('Success', 'login Success', 'success');
            this.router.navigateByUrl('/home');
          } else {
            Swal.fire('warning', 'mail/passWord incorrect', 'warning');
          }
        },
        error: (error: any) => {
          alert(JSON.stringify(error));
          Swal.fire('error', 'Somethng wints wrong', 'error');
        }
      });
    } else {
      Swal.fire('warning', 'all fields are required', 'warning');
    }
  }
}
