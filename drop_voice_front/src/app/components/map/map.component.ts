import { AfterViewInit, Component } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as L from 'leaflet';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  map: any;

  constructor() {}

  public ngAfterViewInit(): void {
    this.loadMap();
  }

  private initialisePosition(pos: any, zoom: number) {
    this.map.flyTo([pos.latitude, pos.longitude], zoom);
    const icon = L.icon({
      iconUrl: '../../../assets/images/marker-icon.png',
      shadowUrl: '../../../assets/images/marker-shadow.png',
      popupAnchor: [13, 0],
    });

    const marker = L.marker([pos.latitude, pos.longitude], {
      icon,
    }).bindPopup('Angular Leaflet');
    marker.addTo(this.map);
  }

  private loadMap(): void {
    const univP8 = {
      latitude: 48.94492,
      longitude: 2.36424,
    };

    this.map = L.map('map').setView([0, 0], 2);
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: environment.mapbox.accessToken,
      }
    ).addTo(this.map);

    this.initialisePosition(univP8, 15);

    // Get the current position automatically when the map is displayed
    // this.getCurrentPosition().subscribe((position: any) => {
    //   this.map.flyTo([position.latitude, position.longitude], 13);

    //   const icon = L.icon({
    //     iconUrl: '../../../assets/images/marker-icon.png',
    //     shadowUrl: '../../../assets/images/marker-shadow.png',
    //     popupAnchor: [13, 0],
    //   });

    //   const marker = L.marker([position.latitude, position.longitude], {
    //     icon,
    //   }).bindPopup('Angular Leaflet');
    //   marker.addTo(this.map);
    // });
  }
}
