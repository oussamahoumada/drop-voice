import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}
  ngOnInit() {}

  public loginForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  authentication() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (res: any) => {
          if (res) {
            this.cookieService.set('token', res.token);
            Swal.fire('Success', 'login Success', 'success');
          } else {
            Swal.fire('warning', 'mail/passWord incorrect', 'warning');
          }
        },
        () => {
          Swal.fire('error', 'Somethng wints wrong', 'error');
        }
      );
    } else {
      Swal.fire('warning', 'all fields are required', 'warning');
    }
  }
}
