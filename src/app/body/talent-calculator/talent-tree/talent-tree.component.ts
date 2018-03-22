import { Component, OnInit } from '@angular/core';
import { TalentCalculatorService } from '../talent-calculator.service';
import { Talent } from '../_models/talents.model';

@Component({
  selector: 'app-talent-tree',
  templateUrl: './talent-tree.component.html',
  styleUrls: ['./talent-tree.component.scss']
})
export class TalentTreeComponent implements OnInit {
  trees = [0, 1, 2];
  rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  cols = [0, 1, 2, 3];

  constructor(private talentService: TalentCalculatorService) { }

  getTalent(tree: number, row: number, col: number): Talent {
    return this.talentService.getTalentState(tree, row, col);
  }

  isInitialized(): boolean {
    if (this.talentService.talentDetails) {
      return true;
    }
    return false;
  }

  getSpecBg(treeId: number): string {
    const spec = this.talentService.getClassSpec(treeId);
    const classId = this.talentService.classId;

    return `url(assets/images/talent-icons/${classId}/${spec}/background.jpg)`;
  }

  ngOnInit() {
  }

}
