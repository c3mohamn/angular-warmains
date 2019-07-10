import { NgModule, Type } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
