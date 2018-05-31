import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Talent } from '../../models/talent.model';
import { routerTransition } from '../../animations/global';
import { RouterFacade } from '../../modules/state/router/router.facade';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  animations: [routerTransition]
})
export class BodyComponent {
  talents: Talent[];
  state: string;

  constructor(private router: Router, private routerFacade: RouterFacade) {
    routerFacade.getCurrentPageTitle().subscribe(title => (this.state = title));
  }
}
