import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DropData } from '../interfaces/drop/drop-interface';
import { BehaviorSubject } from 'rxjs';
import { UrlGeneratorService } from './url-generator.service';
import { corsHeaders } from 'src/app/cors_validation/corsValidation';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class DropDataService {
  constructor(
    private urlService: UrlGeneratorService,
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  public postDrop(body: any): Observable<any> {
    const url = this.urlService.getUrl('/drop/add_drop');

    return this.http.post(url, body, { headers: corsHeaders });
  }

  public getDropsByUser(): Observable<any> {
    const idUser: string = this.cookieService.get('id');
    const url: string = this.urlService.getUrlById('/drop/user/', idUser);
    const response = this.http.get(url, { headers: corsHeaders });

    return response;
  }

  public getAllDrops(): Observable<any> {
    const url: string = this.urlService.getUrl('/drop/get_all_drops');
    const response = this.http.get(url, { headers: corsHeaders });

    return response;
  }

  public removeDrop(drop: DropData): Observable<any> {
    const url: string = this.urlService.getUrlById(
      '/drop/delete_drop/',
      drop.drop_id
    );

    return this.http.delete(url, { headers: corsHeaders });
  }
}
