import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { Injectable } from "@angular/core";

export interface RouterStateUrl {
  url: string;
  title: string;
  params: Params;
  queryParams: Params;
}

@Injectable()
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

    const title = route.data.title || '';

    return { url, title, params, queryParams };
  }
}
