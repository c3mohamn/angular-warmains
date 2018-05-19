import { Component, OnInit, Input } from '@angular/core';
import { TalentCalculatorService } from '../../services/talent-calculator.service';
import { Talent } from '../../models/talents.model';
import { Title } from '@angular/platform-browser';
import { TalentCalculatorFacade } from '../../../../../../modules/state/talent-calculator/talent-calculator.facade';
import { TalentMetaInfo } from '../../../../../../modules/state/talent-calculator/talent-calculator.reducer';
import { talentIdMap } from '../../models/talent-id.map';

@Component({
  selector: 'app-talent-tree',
  templateUrl: './talent-tree.component.html',
  styleUrls: ['./talent-tree.component.scss']
})
export class TalentTreeComponent implements OnInit {
  trees = [0, 1, 2];
  rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  cols = [0, 1, 2, 3];
  meta: TalentMetaInfo;
  talents: Talent[] = [];

  @Input() classId = 1;

  constructor(
    private talentCalculatorService: TalentCalculatorService,
    private title: Title,
    private talentCalculatorFacade: TalentCalculatorFacade
  ) {
    talentCalculatorFacade
      .getTalents()
      .subscribe(data => (this.talents = data));
    talentCalculatorFacade
      .getTalentMetaInfo()
      .subscribe(data => (this.meta = data));
  }

  ngOnInit() {
    this.title.setTitle(
      `Talents | ${this.talentCalculatorService.getClassName(this.classId)}`
    );
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

    const requiredTalent =
      talent && talent.requires && this.talents[talent.requires];

    return [talent, requiredTalent || null];
  }

  getSpecBg(treeId: number): string {
    const spec = this.talentCalculatorService.getClassSpec(
      treeId,
      this.classId
    );

    return `url(assets/images/talent-icons/${
      this.classId
    }/${spec}/background.jpg)`;
  }
}
