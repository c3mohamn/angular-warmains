import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatTableModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatDialogModule
} from '@angular/material';

const materialDesignComponents: ReadonlyArray<Type<any>> = [
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatTableModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatDialogModule
];

@NgModule({
  imports: [
    CommonModule,
    ...materialDesignComponents
  ],
  exports: [
    ...materialDesignComponents
  ],
})
export class AngularMaterialModule { }
