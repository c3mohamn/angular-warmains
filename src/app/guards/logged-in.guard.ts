import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserFacade } from '../modules/state/user/user.facade';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private userFacade: UserFacade, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.userFacade.getUserNotLoggedIn();
  }
}
