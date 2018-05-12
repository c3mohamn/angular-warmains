import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

export interface RouterStateUrl {
  url: string;
  path: string;
  title: string;
  params: Params;
  queryParams: Params;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams }
    } = routerState;
    const { params } = route;

    const path = routerState.root.firstChild.routeConfig.path || '';
    const title = routerState.root.firstChild.routeConfig.data.title || '';

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, path, title, params, queryParams };
  }
}
