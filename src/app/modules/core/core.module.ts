import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClickOutsideModule } from 'ng4-click-outside';
import { HeaderComponent } from './header/components/header/header.component';
import { HeaderTitleComponent } from './header/components/header-title/header-title.component';
import { AccountOptionsComponent } from './header/components/account-options/account-options.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, HeaderTitleComponent, AccountOptionsComponent, FooterComponent],
  imports: [CommonModule, RouterModule, ClickOutsideModule],
  exports: [HeaderComponent, FooterComponent]
})
export class CoreModule {}
