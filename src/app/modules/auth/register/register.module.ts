import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../material/material.module';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: RegisterComponent }]),
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule {}
