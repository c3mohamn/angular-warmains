import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TalentCalculatorComponent } from './talent-calculator.component';
import { TalentHeaderComponent } from './containers/talent-header/talent-header.component';
import { TalentTreeComponent } from './containers/talent-tree/talent-tree.component';
import { TalentGlyphsComponent } from './containers/talent-glyphs/talent-glyphs.component';
import { TalentSavedComponent } from './containers/talent-saved/talent-saved.component';
import { GlyphComponent } from './components/glyph/glyph.component';
import { TalentComponent } from './components/talent/talent.component';

import { MouseWheelDirective } from '../../../../directives/mousewheel.directive';
import { TalentCalculatorService } from './services/talent-calculator.service';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: TalentCalculatorComponent }]),
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
  providers: [TalentCalculatorService]
})
export class TalentCalculatorModule {}
