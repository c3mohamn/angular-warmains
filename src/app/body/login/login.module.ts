import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../../modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/user/auth.service';

@NgModule({
  imports: [
    RouterModule.forChild([{path: '', component: LoginComponent}]),
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    AuthService
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
