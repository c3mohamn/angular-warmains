import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AngularMaterialModule } from '../../material/material.module';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  declarations: [LoginComponent]
})
export class LoginModule {}
