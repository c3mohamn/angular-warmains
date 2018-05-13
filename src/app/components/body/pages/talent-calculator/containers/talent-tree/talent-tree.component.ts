import { Component, OnInit, Input } from '@angular/core';
import { TalentCalculatorService } from '../../services/talent-calculator.service';
import { Talent } from '../../models/talents.model';
import { Title } from '@angular/platform-browser';
import { TalentCalculatorFacade } from '../../../../../../modules/state/talent-calculator/talent-calculator.facade';

@Component({
  selector: 'app-talent-tree',
  templateUrl: './talent-tree.component.html',
  styleUrls: ['./talent-tree.component.scss']
})
export class TalentTreeComponent implements OnInit {
  trees = [0, 1, 2];
  rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  cols = [0, 1, 2, 3];
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
  }

  getTalent(tree: number, row: number, col: number): Talent {
    if (this.talents === []) {
      return null;
    }

    return this.talents.find(
      talent => talent.tree === tree && talent.row === row && talent.col === col
    );
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

  ngOnInit() {
    this.title.setTitle(
      `Talents | ${this.talentCalculatorService.getClassName(this.classId)}`
    );
  }
}
