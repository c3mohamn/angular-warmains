import { UserState } from './user.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';

const getUserState = createFeatureSelector<UserState>('user');

export namespace UserQuery {
  export const getCurrentUser = createSelector(
    getUserState,
    state => state
  );

  export const isLoggedIn = createSelector(
    getUserState,
    state => state.username != null && state.username.length > 1
  );

  export const isNotLoggedIn = createSelector(
    getUserState,
    state => state.username === null || state.username.length === 0
  );

  export const getCurrentUserName = createSelector(
    getUserState,
    state => state.username
  );
}
