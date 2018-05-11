import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule, InjectionToken } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// import { RouterStateModule } from './router/router.state.module';
import { UserStateModule } from './user/user-state.module';
import { UserState } from './user/user.reducer';
import { UserReducer } from '../../states/user/user.reducer';

export interface State {
  user: UserState;
  // talentCalculator: TalentCalculatorState;
}

const reducers: ActionReducerMap<State> = {
  user: UserReducer
  // talentCalculator: TalentCalculatorReducer
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
    UserStateModule
  ],
  providers: [{ provide: REDUCERS_TOKEN, useValue: reducers }]
})
export class AppStateModule {}
