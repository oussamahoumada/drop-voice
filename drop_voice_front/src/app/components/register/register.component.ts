import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SwaleEnum } from 'src/app/enum/swale-enum';

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
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    last_name: new FormControl(null, [Validators.required]),
    first_name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  public register(): void
  {
    if (this.registrationForm.valid) {
      this.authService.registration(this.registrationForm.value).subscribe({
        next: (res: any) => {
          if (res) {
            Swal.fire(SwaleEnum.successFrench, 'Inscription réussi', SwaleEnum.success);
            this.router.navigateByUrl('/login');
          } else {
            Swal.fire(SwaleEnum.warningFrench, 'Problème lors de la validation du formulaire', SwaleEnum.warning);
          }
        },
        error: (error: any) => {
          Swal.fire(SwaleEnum.errorServer, error.error.message ?? 'Une erreur est survenue', SwaleEnum.error);
        },
      });
    } else {
      Swal.fire(SwaleEnum.warningFrench, 'Veuillez remplir tous les champs', SwaleEnum.warning);
    }
  }
}
