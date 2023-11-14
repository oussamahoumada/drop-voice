import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MapComponent } from 'src/app/components/map/map.component';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [MatGridListModule, MapComponent, NavBarComponent],
})
export class HomeComponent {}
