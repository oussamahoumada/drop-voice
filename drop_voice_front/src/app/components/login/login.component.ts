import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit() {}

  public loginForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  doAuthentication() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (res: any) => {
          if (res) {
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
