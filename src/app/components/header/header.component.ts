import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFacade } from '../../modules/state/user/user.facade';
import { RouterFacade } from '../../modules/state/router/router.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  accountOptionsActive = false;
  loggedIn = false;
  username = '';
  pageTitle = '';

  constructor(
    private router: Router,
    private userFacade: UserFacade,
    private routerFacade: RouterFacade
  ) {
    this.userFacade.getUserLoggedIn().subscribe(data => (this.loggedIn = data));
    this.userFacade.getUserName().subscribe(data => (this.username = data));
    this.routerFacade
      .getCurrentPageTitle()
      .subscribe(data => (this.pageTitle = data));
  }

  logoutUser() {
    this.userFacade.logoutUser();
  }

  toggleOptionsActive($event) {
    this.accountOptionsActive = $event;
  }

  ngOnInit() {}
}
