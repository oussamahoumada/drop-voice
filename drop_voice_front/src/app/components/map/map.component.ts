import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import * as L from 'leaflet';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { environment } from '../../../environments/environment';
import { MyCardComponent } from '../my-card/my-card.component';
import { DropDataService } from 'src/app/services/drop-data.service';
import { DropData } from 'src/app/interfaces/drop/drop-interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit, OnInit {
  [x: string]: any;
  map: any;
  dropsData: DropData[] = [];

  constructor(
    public dialog: MatDialog,
    private dropDataService: DropDataService
  ) {}

  displayMarkerContent: boolean = true;
  that = this;

  ngOnInit(): void {
    // this.dropsData = this.dropDataService.getData();
  }

  public ngAfterViewInit(): void {
    this.loadMap();
    const univP8 = {
      latitude: 48.94492,
      longitude: 2.36424,
    };
    // this.getUserRecords();
    // this.initialiseView(univP8, 13);
    this.getCurrentPosition();
    // this.initialiseMarkers();
  }

  handleMarkerClick(dropData: DropData) {
    this.dialog.open(MyCardComponent, { data: dropData });
  }

  // private initialiseView(pos: any, zoom: number) {
  //   this.map.flyTo([pos.latitude, pos.longitude], zoom);
  // }

  private initialiseMarkers() {
    const icon = L.icon({
      iconUrl: '../../../assets/images/marker-icon.png',
      shadowUrl: '../../../assets/images/marker-shadow.png',
      popupAnchor: [13, 0],
    });
    const that = this;
    console.log('je suis la ', this.dropsData);
    this.dropsData.forEach((element) => {
      const marker = L.marker([element.latitude, element.longitude], {
        icon,
      }).on('click', function (e) {
        that.handleMarkerClick(element);
      });
      marker.addTo(this.map);
    });
  }

  private getCurrentPosition(): any {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        const icon = L.icon({
          iconUrl: '../../../assets/images/man.png',
          shadowUrl: '../../../assets/images/marker-shadow.png',
          popupAnchor: [13, 0],
        });
        console.log(' current latitude ', position.coords.latitude);
        console.log(' current longitude ', position.coords.longitude);
        this.map.flyTo(
          [position.coords.latitude, position.coords.longitude],
          13
        );
        const marker = L.marker(
          [position.coords.latitude, position.coords.longitude],
          {
            icon,
          }
        ).bindPopup('Angular Leaflet');
        this.map;
        marker.addTo(this.map);
      });
    }
  }

  private getUserRecords() {
    this.dropDataService.getDropsByUser().subscribe({
      next: (data: any[]) => {
        this.dropsData = data.map((droppp) => {
          return {
            drop_id: droppp.drop_id,
            image_url: droppp.image_url,
            ref_theme: droppp.ref_theme,
            audio_url: droppp.audio_url,
            title: droppp.title,
            longitude: droppp._precise_adress[0].longitude,
            latitude: droppp._precise_adress[0].latitude,
          };
        });
        this.initialiseMarkers();
      },
      error: () => {
        alert('Une erreur est survenu');
      },
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
  }
}
