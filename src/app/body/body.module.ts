import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BodyComponent } from './body.component';


@NgModule({
  declarations: [
    BodyComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BodyComponent
  ]
})
export class BodyModule { }
