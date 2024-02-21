import Swal from 'sweetalert2';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MatDialog } from '@angular/material/dialog';

import { environment } from '../../../environments/environment';
import { MyCardComponent } from '../my-card/my-card.component';
import { DropDataService } from 'src/app/services/drop-data.service';
import { DropData } from 'src/app/interfaces/drop/drop-interface';
import { CookieService } from 'ngx-cookie-service';
import { SwaleEnum } from 'src/app/enum/swale-enum';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit, OnInit {
  [x: string]: any;
  map: any;
  dropsData: DropData[] = [];
  currentPositionMarker: any;

  constructor(
    public dialog: MatDialog,
    private dropDataService: DropDataService,
    private cookieService: CookieService
  ) {}

  displayMarkerContent: boolean = true;
  that = this;

  ngOnInit(): void {}

  public ngAfterViewInit(): void
  {
    this.loadMap();
    this.getUserRecords();
  }

  handleMarkerClick(dropData: DropData): void
  {
    this.dialog.open(MyCardComponent, { data: dropData });
  }

  private initialiseMarkers(): void
  {
    const that = this;
    this.dropsData.forEach((element) => {
      const userIcon = L.icon({
        iconUrl: '../../../assets/images/my-marker.png',
        shadowUrl: '../../../assets/images/marker-shadow.png',
        popupAnchor: [13, 0],
      });
      const generalIcon = L.icon({
        iconUrl: '../../../assets/images/marker-icon.png',
        shadowUrl: '../../../assets/images/marker-shadow.png',
        popupAnchor: [13, 0],
      });

      const icon =
        that.cookieService.get('id') == element.ref_user.toString()
          ? userIcon
          : generalIcon;
      const marker = L.marker([element.latitude, element.longitude], {
        icon,
      }).on('click', function (e) {
        that.handleMarkerClick(element);
      });
      marker.addTo(this.map);

      setInterval(function () {
        that.displayCurrentPosition();
      }, 5000);
    });
  }

  private displayCurrentPosition(): any {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          const icon = L.icon({
            iconUrl: '../../../assets/images/man.png',
            shadowUrl: '../../../assets/images/marker-shadow.png',
          });
          if (this.currentPositionMarker) {
            this.currentPositionMarker.remove();
          } else {
            this.map.flyTo([latitude, longitude], 13);
          }

          this.currentPositionMarker = L.marker([latitude, longitude], {
            icon,
          })
            .bindPopup('Ma position')
            .addTo(this.map);
        },
        (err) => console.log(err),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.log("  Can't get position using navigator.geolocation  ");
    }
  }

  private getUserRecords() {
    this.dropDataService.getAllDrops().subscribe({
      next: (data: any[]) => {
        this.dropsData = data.map((drop) => {
          return {
            drop_id: drop.drop_id,
            image_url: drop.image_url,
            ref_theme: drop.ref_theme,
            audio_url: drop.audio_url,
            title: drop.title,
            ref_user: drop.ref_user,
            longitude: drop._precise_adress[0].longitude,
            latitude: drop._precise_adress[0].latitude,
          };
        });
        this.initialiseMarkers();
      },
      error: () => {
        Swal.fire(SwaleEnum.errorServer, 'Une erreur est survenue.', SwaleEnum.error);
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
