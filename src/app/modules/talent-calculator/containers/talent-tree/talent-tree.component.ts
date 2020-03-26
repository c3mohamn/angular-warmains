import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Talent } from '../../models/talents.model';
import { TalentCalculatorFacade } from '../../../state/talent-calculator/talent-calculator.facade';
import { TalentMetaInfo } from '../../../state/talent-calculator/talent-calculator.reducer';
import { talentIdMap } from '../../models/talent-id.map';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-talent-tree',
  templateUrl: './talent-tree.component.html',
  styleUrls: ['./talent-tree.component.scss']
})
export class TalentTreeComponent implements OnInit, OnDestroy {
  @Input() classId = 1;
  @Input() talentTreeSpecs = ['arms', 'fury', 'protection'];

  private ngUnsubscribe: Subject<any> = new Subject();
  rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  cols = [0, 1, 2, 3];
  meta: TalentMetaInfo;
  talents: Talent[] = [];

  constructor(private talentCalculatorFacade: TalentCalculatorFacade) {}

  ngOnInit() {
    this.talentCalculatorFacade
      .getTalents()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => (this.talents = data));
    this.talentCalculatorFacade
      .getTalentMetaInfo()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => (this.meta = data));
  }

  addTalentPoint(talent: Talent) {
    console.log('Add point to: ', talent.name);
    this.talentCalculatorFacade.addTalentPoint(talent);
  }

  removeTalentPoint(talent: Talent) {
    console.log('Remove point from: ', talent.name);
    this.talentCalculatorFacade.removeTalentPoint(talent);
  }

  getTalents(tree: number, row: number, col: number): [Talent, Talent | null] {
    if (this.talents === []) {
      return null;
    }

    const talentId = talentIdMap[this.classId][tree][row][col];
    const talent = this.talents[talentId];

    const requiredTalent = talent && talent.requires && this.talents[talent.requires];

    return [talent, requiredTalent || null];
  }

  resetTalents(treeId: number): void {
    console.log(`Reset ${this.talentTreeSpecs[treeId]}`);
    this.talentCalculatorFacade.resetTalentPoints(treeId);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
