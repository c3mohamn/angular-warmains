import { Component, OnInit } from '@angular/core';
import { ApiUserService } from '../_services/user/api-user.service';
import { ApiTalentService } from '../_services/talent/api-talent.service';
import { User } from '../_models/user.model';
import { Talent } from '../_models/talent.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  users: User[];
  talents: Talent[];
  error: any;

  constructor(
    private router: Router,
    private _apiUserService: ApiUserService,
    private _apiTalentService: ApiTalentService
  ) {
    this._apiTalentService.getTalents()
      .subscribe(res => {
        this.talents = res;
        console.log(this.talents);
      });
  }

  ngOnInit() {
  }

}
