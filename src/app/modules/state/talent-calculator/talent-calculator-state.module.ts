import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { talentCalculatorReducer } from './talent-calculator.reducer';
import { TalentCalculatorEffects } from './talent-calculator.effects';
import { TalentCalculatorFacade } from './talent-calculator.facade';
import { TalentCalculatorService } from './talent-calculator.service';

@NgModule({
  imports: [
    StoreModule.forFeature('talentCalculator', talentCalculatorReducer),
    EffectsModule.forFeature([TalentCalculatorEffects, TalentCalculatorFacade])
  ],
  providers: [TalentCalculatorFacade, TalentCalculatorService]
})
export class TalentCalculatorStateModule {}
