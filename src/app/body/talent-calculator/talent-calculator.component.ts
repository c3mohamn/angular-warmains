import { Component, OnInit } from '@angular/core';
import { TalentCalculatorService } from './talent-calculator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-talent-calculator',
  templateUrl: './talent-calculator.component.html',
  styleUrls: ['./talent-calculator.component.scss']
})
export class TalentCalculatorComponent implements OnInit {
  classId: number;

  constructor(
    private talentService: TalentCalculatorService,
    private router: Router
  ) {
    this.talentService.init();
  }

  ngOnInit() {
  }

}
