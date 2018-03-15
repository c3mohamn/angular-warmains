import { Component, OnInit } from '@angular/core';
import { TalentCalculatorService } from '../talent-calculator.service';

@Component({
  selector: 'app-talent-tree',
  templateUrl: './talent-tree.component.html',
  styleUrls: ['./talent-tree.component.scss']
})
export class TalentTreeComponent implements OnInit {

  constructor(private _talentCalculatorService: TalentCalculatorService) { }

  getSpecBg(treeId: number): string {
    const spec = this._talentCalculatorService.getClassSpec(treeId);
    const classId = this._talentCalculatorService.classId;

    return 'url(assets/images/talent-icons/' + classId + '/' + spec + '/background.jpg)';
  }

  ngOnInit() {
  }

}
