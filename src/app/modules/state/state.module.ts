import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { Action, ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const emptyStore: ActionReducerMap<any, Action> = {};

@NgModule({
  imports: [
    StoreModule.forRoot(emptyStore),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  declarations: []
})
export class StateModule {}
