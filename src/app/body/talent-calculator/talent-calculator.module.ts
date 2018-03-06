import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TalentCalculatorComponent } from './talent-calculator.component';

@NgModule({
  imports: [
    RouterModule.forChild([{path: '', component: TalentCalculatorComponent}]),
    CommonModule
  ],
  declarations: [
    TalentCalculatorComponent
  ]
})
export class TalentCalculatorModule { }
