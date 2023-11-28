import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit() {}

  public registrationForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    first_name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  Register() {
    if (this.registrationForm.valid) {
      this.authService.Registration(this.registrationForm.value).subscribe(
        (res: any) => {
          if (res) {
            Swal.fire('Success', 'Registration Success', 'success');
          } else {
            Swal.fire('warning', 'Somethng wints wrong', 'warning');
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
