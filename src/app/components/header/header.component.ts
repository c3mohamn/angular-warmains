import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { UserFacade } from '../../modules/state/user/user.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  accountOptionsActive = false;
  loggedIn = false;
  username = '';

  constructor(private router: Router, private userFacade: UserFacade) {
    this.userFacade.getUserLoggedIn().subscribe(data => (this.loggedIn = data));
    this.userFacade.getUserName().subscribe(data => (this.username = data));
  }

  logoutUser() {
    this.userFacade.logoutUser();
  }

  currentState() {
    const path = this.router.url;
    return path.indexOf('talent') > -1 ? 'talent' : path.slice(1);
  }

  toggleOptionsActive($event) {
    this.accountOptionsActive = $event;
  }

  ngOnInit() {}
}
