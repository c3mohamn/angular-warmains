import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TalentCalculatorService } from '../../services/talent-calculator.service';

@Component({
  selector: 'app-talent-header',
  templateUrl: './talent-header.component.html',
  styleUrls: ['./talent-header.component.scss']
})
export class TalentHeaderComponent implements OnInit {
  classIds: number[];
  curClassId: number;

  constructor(
    private router: Router,
    private talentCalculatorService: TalentCalculatorService
  ) {
    this.classIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11];
    this.curClassId = talentCalculatorService.getClassId();
  }

  // reinitialize talent details to new classes
  changeClass(classId: number) {
    if (this.curClassId !== classId) {
      this.curClassId = classId;
      this.router.navigate(['/talent/' + classId]);
      // this.talentCalculatorService.init(classId);
    }
  }

  getTalentPreview(): string {
    const preview = this.talentCalculatorService.getTalentPreview();
    return `(${preview[0]} / ${preview[1]} / ${preview[2]})`;
  }

  getPointsRemaining() {
    return this.talentCalculatorService.pointsRemaining;
  }

  getClassColor(classId: number = this.curClassId): string {
    return this.talentCalculatorService.getClassColor(classId);
  }

  getClassName(classId: number = this.curClassId): string {
    return this.talentCalculatorService.getClassName(classId);
  }

  ngOnInit() {}
}
