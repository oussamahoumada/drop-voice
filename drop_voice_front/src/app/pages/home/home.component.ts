import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public isStepperVisible: boolean = false;
  public isLogged: boolean = false;
  public urlFront: string;

  public constructor(private authService: AuthService, private router: Router) {
    this.urlFront = environment.apiUrl;
  }

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged();
  }

  public toggleStepperComponent(): void {
    if (this.authService.isLogged()) {
      this.isStepperVisible = !this.isStepperVisible;
    }else{
      this.router.navigate(["login"]);
    }
  }
}
