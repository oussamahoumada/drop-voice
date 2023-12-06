import { Injectable } from '@angular/core';
import { UrlGeneratorService } from './url-generator.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { corsHeaders } from '../cors_validation/corsValidation';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private urlService: UrlGeneratorService,
    private http: HttpClient,
    private cookieService: CookieService
  ) {
  }

  public getUser(): Observable<any>
  {
    const idUser: string = this.cookieService.get('id')
    const url: string = this.urlService.getUrlById('/user/User/', idUser)

    return this.http.get(url, { headers: corsHeaders })
  }
}
