import { NgModule, Type } from '@angular/core';
import {
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatDialogModule
} from '@angular/material';

const materialDesignComponents: ReadonlyArray<Type<any>> = [
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatDialogModule
];

@NgModule({
  imports: [...materialDesignComponents],
  exports: [...materialDesignComponents]
})
export class AngularMaterialModule {}
