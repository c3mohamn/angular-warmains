import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
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

export const reducers: ActionReducerMap<State> = {
  user: UserReducer,
  // talentCalculator: TalentCalculatorReducer
};

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, name: 'Warmains' }),
    UserStateModule,
  ],
  providers: []
})
export class AppStateModule {}
