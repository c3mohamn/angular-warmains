import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([{path: '', component: HomeComponent}]),
    CommonModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
