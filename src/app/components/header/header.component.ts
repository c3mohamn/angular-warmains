import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFacade } from '../../modules/state/user/user.facade';
import { RouterFacade } from '../../modules/state/router/router.facade';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  accountOptionsActive = false;
  loggedIn = false;
  username = '';
  pageTitle = '';

  constructor(
    private router: Router,
    private userFacade: UserFacade,
    private routerFacade: RouterFacade
  ) {}

  ngOnInit() {
    this.userFacade
      .getUserLoggedIn()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => (this.loggedIn = data));
    this.userFacade
      .getUserName()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => (this.username = data));
    this.routerFacade
      .getCurrentPageTitle()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => (this.pageTitle = data));
  }

  logoutUser() {
    this.userFacade.logoutUser();
  }

  toggleOptionsActive($event) {
    this.accountOptionsActive = $event;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
