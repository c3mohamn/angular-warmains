import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TalentCalculatorService } from '../../services/talent-calculator.service';
import { TalentCalculatorFacade } from '../../../../../../modules/state/talent-calculator/talent-calculator.facade';

@Component({
  selector: 'app-talent-header',
  templateUrl: './talent-header.component.html',
  styleUrls: ['./talent-header.component.scss']
})
export class TalentHeaderComponent implements OnInit {
  classIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11];
  classId = 1;
  preview = [0, 0, 0];
  remaining = 71;

  constructor(
    private router: Router,
    private talentCalculatorService: TalentCalculatorService,
    private talentCaluclatorFacade: TalentCalculatorFacade
  ) {
    talentCaluclatorFacade.getTalentMetaInfo().subscribe(data => {
      this.remaining = this.remaining - data.totalPoints;
      this.preview = data.preview;
      this.classId = data.classId;
    });
  }

  // reinitialize talent details to new classes
  changeClass(classId: number) {
    if (this.classId !== classId) {
      this.router.navigate(['/talent/' + classId]);
    }
  }

  getTalentPreview(): string {
    return `(${this.preview[0]} / ${this.preview[1]} / ${this.preview[2]})`;
  }

  getClassColor(classId: number = this.classId): string {
    return this.talentCalculatorService.getClassColor(classId);
  }

  getClassName(classId: number = this.classId): string {
    return this.talentCalculatorService.getClassName(classId);
  }

  ngOnInit() {}
}
