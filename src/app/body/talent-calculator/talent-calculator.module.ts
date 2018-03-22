import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TalentCalculatorComponent } from './talent-calculator.component';
import { TalentHeaderComponent } from './talent-header/talent-header.component';
import { TalentTreeComponent } from './talent-tree/talent-tree.component';
import { TalentGlyphsComponent } from './talent-glyphs/talent-glyphs.component';
import { TalentSavedComponent } from './talent-saved/talent-saved.component';
import { GlyphComponent } from './glyph/glyph.component';
import { TalentComponent } from './talent/talent.component';

import { MouseWheelDirective } from '../../_directives/mousewheel.directive';

import { TalentCalculatorService } from './talent-calculator.service';

@NgModule({
  imports: [
    RouterModule.forChild([{path: '', component: TalentCalculatorComponent}]),
    CommonModule
  ],
  declarations: [
    TalentCalculatorComponent,
    TalentHeaderComponent,
    TalentTreeComponent,
    TalentGlyphsComponent,
    TalentSavedComponent,
    GlyphComponent,
    TalentComponent,
    MouseWheelDirective
  ],
  providers: [
    TalentCalculatorService
  ]
})
export class TalentCalculatorModule { }
