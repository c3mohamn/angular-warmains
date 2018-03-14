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
    private _talentCalculatorService: TalentCalculatorService,
    private router: Router
  ) {
    this.classId = this.getClassIdFromUrl(this.router.url);
    this.getTalentDetails(this.classId);
  }

  getTalentDetails(classId: number) {
    this._talentCalculatorService.getTalentDetails()
      .subscribe(
        data => {
          this._talentCalculatorService.loadTalentDetailsState(data[classId], classId);
        },
        error => console.log(error)
      );
  }

  // converts path to url
  getClassIdFromUrl(path): number {
    const classId = Number(path.slice(path.indexOf('/', 2) + 1));

    if (isNaN(classId) || classId === 10 || classId > 11 || classId < 1) {
      // not a number, redirect to base class
      this.router.navigate(['/talent/1']);
      return 1;
    }

    return classId;
  }

  ngOnInit() {
  }

}
