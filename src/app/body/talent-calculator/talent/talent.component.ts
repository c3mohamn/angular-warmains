import { Component, OnInit, Input } from '@angular/core';
import { TalentCalculatorService } from '../talent-calculator.service';
import { Talent } from '../_models/talents.model';

@Component({
  selector: 'app-talent',
  templateUrl: './talent.component.html',
  styleUrls: ['./talent.component.scss']
})
export class TalentComponent implements OnInit {
  talent: any;

  @Input() row: number;
  @Input() col: number;
  @Input() tree: number;

  constructor(
    private _talentCalculatorService: TalentCalculatorService
  ) {
    // this.talent = this._talentCalculatorService.getTalentState(this.tree, this.row, this.col);
    // const talent = this._talentCalculatorService.getTalentState(this.tree, this.row, this.col);
    // console.log(talent);
  }

  getTalentDetails() {
  }

  ngOnInit() {
    // console.log('here');
    // console.log(talent);
  }

}
