import { Component, OnInit, HostBinding  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/user/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private _authService: AuthService
  ) {
    console.log(_authService.user);
  }

  logoutUser() {
    this._authService.logout();
  }

  currentState() {
    return window.location.pathname.slice(1);
  }

  ngOnInit() {
  }

}
