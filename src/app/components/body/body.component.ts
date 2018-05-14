import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Talent } from '../../models/talent.model';
import { TalentService } from '../../modules/api/services/talent.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  talents: Talent[];

  constructor(private router: Router, private talentService: TalentService) {
    // this.talentService.getTalents().subscribe(res => {
    //   this.talents = res;
    //   console.log(this.talents);
    // });
  }

  ngOnInit() {}
}
