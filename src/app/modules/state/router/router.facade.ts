import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { RouterQuery, RouterState } from './router.selector';
import { RouterStateUrl } from './router.reducer';

@Injectable()
export class RouterFacade {
  constructor(private actions$: Actions, private store: Store<RouterState>) {}

  /**
   * Returns current router state.
   */
  getCurrentState(): Observable<RouterStateUrl> {
    return this.store.select(RouterQuery.getState);
  }

  /**
   * Returns current url path.
   */
  getCurrentUrl(): Observable<string> {
    return this.store.select(RouterQuery.getCurrentUrl);
  }

  /**
   * Returns title of current page according to app routing.
   */
  getCurrentPageTitle(): Observable<string> {
    return this.store.select(RouterQuery.getCurrentPageTitle);
  }

  /**
   * Returns current url params.
   */
  getCurrentParams(): Observable<any> {
    return this.store.select(RouterQuery.getCurrentParams);
  }

  /**
   * Returns current url query params.
   */
  getCurrentQueryParams(): Observable<any> {
    return this.store.select(RouterQuery.getCurrentParams);
  }
}
