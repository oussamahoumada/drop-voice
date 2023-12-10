import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DropData } from 'src/app/interfaces/drop/drop-interface';
import { DropDataService } from 'src/app/services/drop-data.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-records',
  templateUrl: './user-records.component.html',
  styleUrls: ['./user-records.component.css']
})
export class UserRecordsComponent implements OnInit {
  public dropsData: DropData[] = [];

  public constructor (
    private dropService: DropDataService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getUserRecords();
  }

  public drops$: BehaviorSubject<DropData[]> = new BehaviorSubject(this.dropsData);

  public removeDropInDom(drop: DropData): void
  {
    const index = this.dropsData.indexOf(drop, 1);
  
    this.dropsData.splice(index, 1);
    this.drops$.next(this.dropsData);
  }

  private getUserRecords() {
    this.dropService.getDropsByUser().subscribe({
      next: (data: DropData[]) => {
        this.dropsData = data;
      },
      error: () => {
        alert('Une erreur est survenu')
      }
    })
  }

  public openConfirmationDialog(drop: DropData): void
  {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: 'Voulez-vous vraiment effectuer cette action ?' },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.dropService.removeDrop(drop).subscribe({
          next: (response: any) => {
            if (response === 'success') {
              this.removeDropInDom(drop)
            }
          },
          error: (error: any) => {
            console.error(error)
          }
        })
      }
    });
  }
}
