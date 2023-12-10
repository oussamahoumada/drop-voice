import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})

export class NavBarComponent {

  public constructor(
    private cookieService: CookieService,
    public authService: AuthService
  ) {}

  public handleLogout(): void
  {
    const token: string = this.cookieService.get('token')
    this.authService.logout(token)
  }
}
