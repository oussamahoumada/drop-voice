import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UrlGeneratorService {

  public getUrl (url: string): string
  {
    return environment.apiUrl + url
  }

  public getUrlById (url: string, id: string|number): string
  {
    return environment.apiUrl + url + id
  }
}

