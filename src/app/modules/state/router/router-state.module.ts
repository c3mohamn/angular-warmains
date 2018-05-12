import { Inject, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { RouterFacade } from './router.facade';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { CustomSerializer } from './router.reducer';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
  routerReducer
} from '@ngrx/router-store';

@NgModule({
  imports: [
    StoreModule.forFeature('router', routerReducer),
    RouterModule,
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    })
  ],
  providers: [
    RouterFacade,
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ]
})
export class RouterStateModule {}
