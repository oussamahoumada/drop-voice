import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-my-card',
  templateUrl: './my-card.component.html',
  styleUrls: ['./my-card.component.css'],
})
export class MyCardComponent {
  dropData;
  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.dropData = data;
  }
}
