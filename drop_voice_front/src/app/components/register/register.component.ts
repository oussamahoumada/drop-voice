import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public urlFront: string = '';
  constructor(private authService: AuthService, private router: Router) {
    this.urlFront = environment.apiUrl;
  }

  public registrationForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    first_name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  public register() {
    if (this.registrationForm.valid) {
      this.authService.registration(this.registrationForm.value).subscribe({
        next: (res: any) => {
          if (res) {
            Swal.fire('Success', 'Registration Success', 'success');
            this.router.navigateByUrl('/login');
          } else {
            Swal.fire('warning', 'Something wints wrong', 'warning');
          }
        },
        error: () => {
          Swal.fire('error', 'Something wints wrong', 'error');
        },
      });
    } else {
      Swal.fire('warning', 'all fields are required', 'warning');
    }
  }
}
