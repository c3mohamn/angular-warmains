import { createSelector, createFeatureSelector } from '@ngrx/store';
import { RouterStateUrl } from './router.reducer';

export interface RouterState {
  state: RouterStateUrl;
  navigationId: number;
}

const getRouterState = createFeatureSelector<RouterState>('router');

export namespace RouterQuery {
  export const getCurrentUrl = createSelector(
    getRouterState,
    state => state && state.state && state.state.url
  );

  export const getCurrentPageTitle = createSelector(
    getRouterState,
    state => state && state.state && state.state.title
  );

  export const getCurrentParams = createSelector(
    getRouterState,
    state => state && state.state && state.state.params
  );

  export const getCurrentQueryParams = createSelector(
    getRouterState,
    state => state && state.state && state.state.queryParams
  );
}
