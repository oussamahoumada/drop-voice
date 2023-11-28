import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { corsHeaders } from 'src/app/cors_validation/corsValidation';
import { UrlGeneratorService } from './url-generator.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private urlAuth: string = '/auth'

  constructor(private http: HttpClient, private urlService: UrlGeneratorService) {}

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
}
