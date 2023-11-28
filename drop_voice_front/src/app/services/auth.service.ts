import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { corsHeaders } from 'src/app/cors_validation/corsValidation';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  readonly url = 'http://localhost:5000/auth/';
  login(body: any): Observable<any> {
    let req = this.url + 'login';
    return this.http.post(req, body, { headers: corsHeaders });
  }
  Registration(body: any): Observable<any> {
    let req = this.url + 'register';
    return this.http.post(req, body, { headers: corsHeaders });
  }
}
