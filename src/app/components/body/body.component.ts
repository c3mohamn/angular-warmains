import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Talent } from '../../models/talent.model';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  talents: Talent[];

  constructor(private router: Router) {}
}
