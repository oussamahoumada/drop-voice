import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { DropData } from 'src/app/interfaces/drop/drop-interface';
import { DropDataService } from 'src/app/services/drop-data.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-records',
  templateUrl: './user-records.component.html',
  styleUrls: ['./user-records.component.css']
})
export class UserRecordsComponent implements OnInit {
  public dropsData: DropData[] = [];

  public constructor (
    private cookieService: CookieService,
    private dropService: DropDataService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getUserRecords();
  }

  private getUserRecords() {
    const idUser: string = this.cookieService.get('id')
    const token: string = this.cookieService.get('token')

    this.dropsData = this.dropService.getData()
  }

  public openConfirmationDialog(dropId: number): void
  {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: 'Voulez-vous vraiment effectuer cette action ?' },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(dropId)
        this.dropService.removeDrop(dropId)
      }
    });
  }
}
