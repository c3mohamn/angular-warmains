import { Component, OnInit } from '@angular/core';
import { UserFacade } from '../../state/user/user.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private userFacade: UserFacade) {}

  ngOnInit() {
    this.userFacade.validateUser();
  }
}
