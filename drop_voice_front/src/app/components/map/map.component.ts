import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as L from 'leaflet';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { environment } from '../../../environments/environment';
import { MyCardComponent } from '../my-card/my-card.component';
import { DropDataService } from 'src/app/services/drop-data.service';
import { DropData } from 'src/app/types/my-types';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit, OnInit {
  map: any;
  dropsData: DropData[] = [];

  constructor(
    public dialog: MatDialog,
    private dropDataService: DropDataService
  ) {}

  displayMarkerContent: boolean = true;
  that = this;

  ngOnInit(): void {
    this.dropsData = this.dropDataService.getData();
  }

  public ngAfterViewInit(): void {
    this.loadMap();
    const univP8 = {
      latitude: 48.94492,
      longitude: 2.36424,
    };
    this.initialiseView(univP8, 13);
    this.initialiseMarkers();
  }

  handleMarkerClick(dropData: DropData) {
    this.dialog.open(MyCardComponent, { data: dropData });
  }

  private initialiseView(pos: any, zoom: number) {
    this.map.flyTo([pos.latitude, pos.longitude], zoom);
    this.map;
  }

  private initialiseMarkers() {
    const icon = L.icon({
      iconUrl: '../../../assets/images/marker-icon.png',
      shadowUrl: '../../../assets/images/marker-shadow.png',
      popupAnchor: [13, 0],
    });
    const that = this;
    this.dropsData.forEach((element) => {
      const marker = L.marker([element.latitude, element.longitude], {
        icon,
      }).on('click', function (e) {
        that.handleMarkerClick(element);
      });
      marker.addTo(this.map);
    });
  }

  //  Load Map
  private loadMap(): void {
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

  private getCurrentPosition(): any {
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          observer.complete();
        });
      } else {
        observer.error();
      }
    });
  }
}
