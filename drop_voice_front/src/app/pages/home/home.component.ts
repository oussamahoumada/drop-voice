import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public isStepperVisible: boolean = false;
  public isLogged: boolean = false

  public constructor (
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged()
  }

  public toggleStepperComponent(): void
  {
    if (this.authService.isLogged()) {
      this.isStepperVisible = !this.isStepperVisible;
    }
  }
}
