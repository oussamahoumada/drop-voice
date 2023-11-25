import { NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MyCardComponent } from '../my-card/my-card.component';

@Component({
  selector: 'app-marker-content',
  templateUrl: './marker-content.component.html',
  styleUrls: ['./marker-content.component.css'],
})
export class MarkerContentComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
    this.dialog.open(MyCardComponent, {
      data: {
        animal: 'panda',
      },
    });
  }
}

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
