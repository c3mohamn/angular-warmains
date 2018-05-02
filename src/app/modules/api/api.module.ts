import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TalentService } from './services/talent.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [TalentService, UserService]
})
export class ApiModule { }
