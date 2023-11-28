import { Injectable } from '@angular/core';
import { DropData } from '../types/my-types';

@Injectable({
  providedIn: 'root',
})
export class DropDataService {
  private data: DropData[] = [
    {
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      title: 'title1',
      theme: 'theme1',
      audio: 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav',
      longitude: 2.365053,
      latitude: 48.944116,
    },
    {
      imageUrl:
        'https://images.caradisiac.com/images/2/1/0/6/172106/S0-mercedes-amg-classe-a-35-un-prix-de-50-400-eur-569831.jpg',
      title: 'title2',
      theme: 'theme2',
      audio: 'https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav',
      longitude: 2.3887546598612985,
      latitude: 48.9447318200729,
    },
    {
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Tour_eiffel_-_vue_du_trocad%C3%A9ro.jpg/1200px-Tour_eiffel_-_vue_du_trocad%C3%A9ro.jpg',
      title: 'title3',
      theme: 'theme3',
      audio: 'https://www2.cs.uic.edu/~i101/SoundFiles/PinkPanther30.wav',
      longitude: 2.3486125422928428,
      latitude: 48.966039011719836,
    },
    {
      imageUrl:
        'https://fr.schreder.com/sites/default/files/2020-03/accent-architectural-maqam-echahid-algiers-algeria-sculpdot-78a8868.jpg',
      title: 'title4',
      theme: 'theme4',
      audio: 'https://www2.cs.uic.edu/~i101/SoundFiles/PinkPanther30.wav',
      longitude: 2.378178053132829,
      latitude: 48.94293899774667,
    },
  ];
  getData(): any[] {
    return this.data;
  }
}
