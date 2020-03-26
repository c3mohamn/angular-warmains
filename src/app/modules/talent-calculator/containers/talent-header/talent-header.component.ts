import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TalentCalculatorFacade } from '../../../state/talent-calculator/talent-calculator.facade';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TalentMetaInfo } from '../../../state/talent-calculator/talent-calculator.reducer';
import { UserFacade } from '../../../state/user/user.facade';
import { ClassUtil } from '../../../../utils/class.util';

@Component({
  selector: 'app-talent-header',
  templateUrl: './talent-header.component.html',
  styleUrls: ['./talent-header.component.scss']
})
export class TalentHeaderComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  classIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11];
  currentClassId = 1;
  preview = [0, 0, 0];
  remaining = 71;
  totalPoints = 0;
  meta: TalentMetaInfo; // TODO: Change this to correct type
  username = '';

  constructor(
    private router: Router,
    private talentCaluclatorFacade: TalentCalculatorFacade,
    private userFacade: UserFacade
  ) {}

  ngOnInit() {
    this.talentCaluclatorFacade
      .getTalentMetaInfo()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        // TODO: TotalPoints does not change on reset, but preview does... ?
        this.meta = data;
        this.totalPoints = data.totalPoints;
        this.preview = data.preview;
        this.currentClassId = data.classId;
      });

    this.userFacade
      .getUserName()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => (this.username = data));
  }

  saveTalent(): void {
    this.userFacade.openSaveTalentDialog(this.meta, this.username);
  }

  changeClass(classId: number) {
    if (this.currentClassId !== classId) {
      this.router.navigate(['/talent/' + classId]);
    }
  }

  getRemainingTalentPoints(): number {
    return 71 - this.totalPoints;
  }

  getTalentPreview(): string {
    return `(${this.preview[0]} / ${this.preview[1]} / ${this.preview[2]})`;
  }

  getClassColor(classId: number = this.currentClassId): string {
    return ClassUtil.getClassColor(classId);
  }

  getClassName(classId: number = this.currentClassId): string {
    return ClassUtil.getClassName(classId);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
