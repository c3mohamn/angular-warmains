import { Component, OnInit } from '@angular/core';
import { TalentCalculatorService } from './talent-calculator.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-talent-calculator',
  templateUrl: './talent-calculator.component.html',
  styleUrls: ['./talent-calculator.component.scss']
})
export class TalentCalculatorComponent implements OnInit {
  talentDetails: any;
  classId: number;

  constructor(
    private _talentCalculatorService: TalentCalculatorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log(this.classId);
    this.getTalentDetails(this.classId);
  }

  getTalentDetails(classId: number) {
    this._talentCalculatorService.getTalentDetails()
      .subscribe(
        data => {
          console.log(data);
          this.talentDetails = data;
        },
        error => console.log(error)
      );
  }

  ngOnInit() {
  }

}
