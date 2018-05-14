import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { RouterQuery, RouterState } from './router.selector';

@Injectable()
export class RouterFacade {
  constructor(private actions$: Actions, private store: Store<RouterState>) {}

  getCurrentUrl(): Observable<string> {
    return this.store.select(RouterQuery.getCurrentUrl);
  }

  getCurrentPageTitle(): Observable<string> {
    return this.store.select(RouterQuery.getCurrentPageTitle);
  }

  getCurrentParams(): Observable<any> {
    return this.store.select(RouterQuery.getCurrentParams);
  }

  getCurrentQueryParams(): Observable<any> {
    return this.store.select(RouterQuery.getCurrentParams);
  }
}
