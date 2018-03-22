import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';
import { HeaderTitleComponent } from './header-title/header-title.component';
import { AccountOptionsComponent } from './account-options/account-options.component';

import { ClickOutsideModule } from 'ng4-click-outside';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderTitleComponent,
    AccountOptionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ClickOutsideModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
