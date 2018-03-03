import { Component, OnInit, HostBinding   } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/user/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  accountOptionsActive = false;

  constructor(
    private router: Router,
    private _authService: AuthService
  ) {
  }

  logoutUser() {
    this._authService.logout();
  }

  isUserLoggedIn(): boolean {
    return this._authService.isLoggedIn();
  }

  currentState() {
    return window.location.pathname.slice(1);
  }

  toggleOptionsActive($event) {
    this.accountOptionsActive = $event;
  }

  ngOnInit() {
  }
}
