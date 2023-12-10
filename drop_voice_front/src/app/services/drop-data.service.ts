import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DropData } from '../interfaces/drop/drop-interface';
import { BehaviorSubject } from 'rxjs';
import { UrlGeneratorService } from './url-generator.service';
import { corsHeaders } from 'src/app/cors_validation/corsValidation';


@Injectable({
  providedIn: 'root',
})
export class DropDataService {
  constructor(
    private urlService: UrlGeneratorService,
    private http: HttpClient
  ) {}

  public postDrop(body: any): Observable<any> {
    const url = this.urlService.getUrl('/drop/add_drop');

    return this.http.post(url, body, { headers: corsHeaders });
  }

  private data: DropData[] = [
    {
      id: 1,
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      title: 'title1',
      theme: 'theme1',
      audio: 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav',
      longitude: 2.365053,
      latitude: 48.944116,
    },
    {
      id: 2,
      imageUrl:
        'https://images.caradisiac.com/images/2/1/0/6/172106/S0-mercedes-amg-classe-a-35-un-prix-de-50-400-eur-569831.jpg',
      title: 'title2',
      theme: 'theme2',
      audio: 'https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav',
      longitude: 2.3887546598612985,
      latitude: 48.9447318200729,
    },
    {
      id: 3,
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Tour_eiffel_-_vue_du_trocad%C3%A9ro.jpg/1200px-Tour_eiffel_-_vue_du_trocad%C3%A9ro.jpg',
      title: 'title3',
      theme: 'theme3',
      audio: 'https://www2.cs.uic.edu/~i101/SoundFiles/PinkPanther30.wav',
      longitude: 2.3486125422928428,
      latitude: 48.966039011719836,
    },
    {
      id: 4,
      imageUrl:
        'https://fr.schreder.com/sites/default/files/2020-03/accent-architectural-maqam-echahid-algiers-algeria-sculpdot-78a8868.jpg',
      title: 'title4',
      theme: 'theme4',
      audio: 'https://www2.cs.uic.edu/~i101/SoundFiles/PinkPanther30.wav',
      longitude: 2.378178053132829,
      latitude: 48.94293899774667,
    },
  ];

  public drops$: BehaviorSubject<DropData[]> = new BehaviorSubject(this.data);

  getData(): DropData[] {
    return this.data;
  }

  private removeDropInDom(drop: DropData): void
  {
    const index = this.data.indexOf(drop, 1);
  
    this.data.splice(index, 1);
    this.drops$.next(this.data);
  }

  public removeDrop(drop: DropData): void
  {
    this.removeDropInDom(drop)
  }
}
