import { Component } from '@angular/core';
import { UserFacade } from '../../modules/state/user/user.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private userFacade: UserFacade) {
    userFacade.validateUser();
  }
}
