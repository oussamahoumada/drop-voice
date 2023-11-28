import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlGeneratorService } from './url-generator.service';
import { corsHeaders } from 'src/app/cors_validation/corsValidation';


@Injectable({
  providedIn: 'root'
})
export class ThemeApiService {

  constructor(private urlService: UrlGeneratorService, private http: HttpClient) {
  }

  public getThemes(): Observable<any>
  {
    const url = this.urlService.getUrl('/theme/Theme')

    return this.http.get(url, { headers: corsHeaders })
  }
}

