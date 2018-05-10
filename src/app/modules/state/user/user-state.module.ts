import { NgModule, Inject } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { userReducer } from './user.reducer';
import { UserEffects } from './user.effects';
import { UserFacade } from './user.facade';
import { UserService } from '../../api/services/user.service';

@NgModule({
  imports: [
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffects, UserFacade])
  ],
  providers: [UserFacade]
})
export class UserStateModule {}
