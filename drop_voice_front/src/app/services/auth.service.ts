import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { corsHeaders } from 'src/app/cors_validation/corsValidation';
import { UrlGeneratorService } from './url-generator.service';
import { SwaleEnum } from '../enum/swale-enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private urlAuth: string = '/auth';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLogged());
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
    private urlService: UrlGeneratorService,
    private cookieService: CookieService
  ) {
  }

  public setLogged(isLogged: boolean): void
  {
    this.isLoggedInSubject.next(isLogged)
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
        if (success.success) {
          this.cookieService.deleteAll();
        }
      },
      error: (error: any) => {
        Swal.fire(SwaleEnum.errorServer, error.error.message ?? 'Une erreur est survenue' , SwaleEnum.error);
      }
    })
  }
}
