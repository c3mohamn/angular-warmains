import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/user/auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const isLoggedin = this._authService.isLoggedIn();
      console.log('canActivate:', !isLoggedin);

      // Redirect to home page if already logged in
      if (isLoggedin) {
        this.router.navigate(['/home']);
      }

      return !isLoggedin;
  }
}
