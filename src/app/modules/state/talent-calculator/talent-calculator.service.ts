import { Injectable } from '@angular/core';
import { Talent } from '../../../components/body/pages/talent-calculator/models/talents.model';
import {
  TalentCalculatorState,
  TalentMetaInfo
} from './talent-calculator.reducer';
import { Store } from '@ngrx/store';
import { TalentCalculatorQuery } from './talent-calculator.selector';

@Injectable()
export class TalentCalculatorService {
  meta: TalentMetaInfo;

  constructor(private store$: Store<TalentCalculatorState>) {
    store$
      .select(TalentCalculatorQuery.getMetaInfo)
      .subscribe(data => (this.meta = data));
  }

  getTalentDetails(details: any): Talent[] {
    const talents: Talent[] = [];

    Object.keys(details).forEach(key => {
      const talent = details[key];

      const newTalent: Talent = {
        name: talent.name,
        id: +key,
        row: talent.row,
        col: talent.col,
        curRank: 0,
        maxRank: talent.maxRank,
        tree: talent.tree,
        tooltip: [],
        allows: talent.allows,
        requires: talent.requires,
        arrows: talent.arrows
      };

      talents.push(newTalent);
    });

    return talents;
  }

  getTalentTooltips(talents: Talent[], tooltips: any): Talent[] {
    talents.forEach((talent, index) => (talent.tooltip = tooltips[index]));

    return talents;
  }

  getTalentMetaInfo(talents: Talent[], classId: number): TalentCalculatorState {
    const state: TalentCalculatorState = {
      talents: talents,
      meta: {
        talentUrlParam: '',
        glyphUrlParam: '',
        classId: classId,
        spec: '',
        totalPoints: 0,
        preview: [0, 0, 0],
        treeRows: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        lastActiveRow: [0, 0, 0]
      }
    };

    return state;
  }

  updateTalentMetaInfo(talent: Talent, addPoint: boolean): TalentMetaInfo {
    console.log(this.meta);

    return this.meta;
  }
}
