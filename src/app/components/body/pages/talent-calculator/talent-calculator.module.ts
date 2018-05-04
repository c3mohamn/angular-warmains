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

import { TalentCalculatorService } from './services/talent-calculator.service';
import { MouseWheelDirective } from '../../../../directives/mousewheel.directive';
import { TooltipModule } from '../../../../directives/tooltip/tooltip.module';
import { WINDOW_PROVIDERS } from '../../../../services/window.service';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: TalentCalculatorComponent }]),
    CommonModule,
    TooltipModule
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
  providers: [TalentCalculatorService, WINDOW_PROVIDERS]
})
export class TalentCalculatorModule {}
