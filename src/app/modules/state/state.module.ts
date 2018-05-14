import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule, InjectionToken } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { RouterStateModule } from './router/router-state.module';
import { UserStateModule } from './user/user-state.module';
import { UserState, userReducer } from './user/user.reducer';
import { RouterState } from './router/router.selector';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { RouterStateUrl } from './router/router.reducer';
import { TalentCalculatorState, talentCalculatorReducer } from './talent-calculator/talent-calculator.reducer';
import { TalentCalculatorStateModule } from './talent-calculator/talent-calculator-state.module';

export interface State {
  user: UserState;
  router: RouterReducerState<RouterStateUrl>;
  talentCalculator: TalentCalculatorState;
}

const reducers: ActionReducerMap<State> = {
  user: userReducer,
  router: routerReducer,
  talentCalculator: talentCalculatorReducer
};

export const REDUCERS_TOKEN = new InjectionToken<ActionReducerMap<State>>(
  'Registered Reducers'
);
Object.assign(REDUCERS_TOKEN, reducers);

@NgModule({
  imports: [
    StoreModule.forRoot(REDUCERS_TOKEN),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, name: 'Warmains' }),
    UserStateModule,
    RouterStateModule,
    TalentCalculatorStateModule
  ],
  providers: [{ provide: REDUCERS_TOKEN, useValue: reducers }]
})
export class AppStateModule {}
