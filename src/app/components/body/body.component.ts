import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { Talent } from '../../models/talent.model';
import { UserService } from '../../modules/api/services/user.service';
import { TalentService } from '../../modules/api/services/talent.service';

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
    // private userService: UserService,
    private talentService: TalentService
  ) {
    // this.talentService.getTalents().subscribe(res => {
    //   this.talents = res;
    //   console.log(this.talents);
    // });
  }

  ngOnInit() {}
}
