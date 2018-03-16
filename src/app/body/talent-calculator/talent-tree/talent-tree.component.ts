import { Component, OnInit } from '@angular/core';
import { TalentCalculatorService } from '../talent-calculator.service';

@Component({
  selector: 'app-talent-tree',
  templateUrl: './talent-tree.component.html',
  styleUrls: ['./talent-tree.component.scss']
})
export class TalentTreeComponent implements OnInit {
  trees = [0, 1, 2];
  rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  cols = [0, 1, 2, 3];

  constructor(private _talentCalculatorService: TalentCalculatorService) { }

  getSpecBg(treeId: number): string {
    const spec = this._talentCalculatorService.getClassSpec(treeId);
    const classId = this._talentCalculatorService.classId;

    return 'url(assets/images/talent-icons/' + classId + '/' + spec + '/background.jpg)';
  }

  ngOnInit() {
  }

}
