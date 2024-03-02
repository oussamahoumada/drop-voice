import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DropData } from 'src/app/interfaces/drop/drop-interface';

@Component({
  selector: 'app-my-card',
  templateUrl: './my-card.component.html',
  styleUrls: ['./my-card.component.css'],
})
export class MyCardComponent {
  public dropData: DropData;

  constructor(@Inject(MAT_DIALOG_DATA) data: DropData) {
    this.dropData = data;
  }
}
