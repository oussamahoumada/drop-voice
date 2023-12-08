import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { corsHeaders } from 'src/app/cors_validation/corsValidation';
import { UrlGeneratorService } from './url-generator.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private urlAuth: string = '/auth';

  constructor(
    private http: HttpClient,
    private urlService: UrlGeneratorService,
    private router: Router,
    private cookieService: CookieService
  ) {
  }

  /**
   * @returns boolean
   */
  public isLogged(): boolean
  {
    return Boolean(this.cookieService.get('token'))
  }

  public login(body: any): Observable<any>
  {
    let url = this.urlService.getUrl(this.urlAuth + '/login');

    return this.http.post(url, body, { headers: corsHeaders });
  }

  public registration(body: any): Observable<any>
  {
    let url = this.urlService.getUrl(this.urlAuth + '/register');

    return this.http.post(url, body, { headers: corsHeaders });
  }

  public logout(token: string): void
  {
    let url: string = this.urlService.getUrl(this.urlAuth + '/logout');
    const body: Object = {
      idToken: token
    }

    const response: Observable<Object> = this.http.post(url, JSON.stringify(body), { headers: corsHeaders });

    response.subscribe({
      next: (success: any) => {
        console.log(success)
        
        if (success.success) {
          this.cookieService.deleteAll();
          this.router.navigateByUrl('/');
        }
      },
      error: (error: any) => {
        console.error(error)
        alert('Une erreur du serveur est survenu')
      }
    })
  }
}
