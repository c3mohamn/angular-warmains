import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([{path: '', component: LoginComponent}]),
    CommonModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
