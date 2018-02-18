import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header.component';
import { HeaderTitleComponent } from './header-title/header-title.component';


@NgModule({
  declarations: [
    HeaderComponent,
    HeaderTitleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
