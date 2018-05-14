import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
  routerReducer
} from '@ngrx/router-store';

import { RouterFacade } from './router.facade';
import { CustomSerializer } from './router.reducer';

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
