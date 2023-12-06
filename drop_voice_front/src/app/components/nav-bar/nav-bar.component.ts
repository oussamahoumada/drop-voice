import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})

export class NavBarComponent {

  constructor(
    private cookieService: CookieService
  ) {}

  /**
   * @returns boolean
   */
  public isLogged(): boolean
  {
    return Boolean(this.cookieService.get('token'))
  }
}
