import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TalentCalculatorService } from '../../services/talent-calculator.service';
import { TalentCalculatorFacade } from '../../../../../../modules/state/talent-calculator/talent-calculator.facade';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-talent-header',
  templateUrl: './talent-header.component.html',
  styleUrls: ['./talent-header.component.scss']
})
export class TalentHeaderComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  classIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11];
  classId = 1;
  preview = [0, 0, 0];
  remaining = 71;
  totalPoints = 0;

  constructor(
    private router: Router,
    private talentCalculatorService: TalentCalculatorService,
    private talentCaluclatorFacade: TalentCalculatorFacade
  ) {}

  ngOnInit() {
    this.talentCaluclatorFacade
      .getTalentMetaInfo()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        // TODO: TotalPoints does not change on reset, but preview does... ?
        console.log('change', data.totalPoints);
        this.totalPoints = data.totalPoints;
        this.preview = data.preview;
        this.classId = data.classId;
      });
  }

  changeClass(classId: number) {
    if (this.classId !== classId) {
      this.router.navigate(['/talent/' + classId]);
    }
  }

  getRemainingPoints(): number {
    return 71 - this.totalPoints;
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
