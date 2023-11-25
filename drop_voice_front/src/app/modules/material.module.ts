import { NgModule } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

const materials: any = [
  MatMenuModule,
  MatTabsModule,
  MatSortModule,
  MatIconModule,
  MatInputModule,
  MatTableModule,
  MatButtonModule,
  MatDialogModule,
  MatSelectModule,
  MatGridListModule,
  MatCardModule,
  MatFormFieldModule,
  MatPaginatorModule,
];
@NgModule({
  imports: [materials],
  exports: [materials],
})
export class MaterialModule {}
