import { Injectable } from '@angular/core';
import { Talent } from '../../../components/body/pages/talent-calculator/models/talents.model';
import {
  TalentCalculatorState,
  TalentMetaInfo
} from './talent-calculator.reducer';
import { Store } from '@ngrx/store';
import { TalentCalculatorQuery } from './talent-calculator.selector';
import { canAddPoint, canRemovePoint } from './talent-calculator.helper';

@Injectable()
export class TalentCalculatorService {
  state: TalentCalculatorState;

  constructor(private store$: Store<TalentCalculatorState>) {
    store$
      .select(TalentCalculatorQuery.getState)
      .subscribe(data => (this.state = data));
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
        arrows: talent.arrows,
        iconPath: talent.iconPath
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

  canAddPoint(talent: Talent): boolean {
    return canAddPoint(this.state, talent);
  }

  canRemovePoint(talent: Talent): boolean {
    return canRemovePoint(this.state, talent);
  }

  getUpdatedTalentMetaInfo(talent: Talent, amount: number): TalentMetaInfo {
    const meta = Object.assign({}, this.state.meta);

    meta.totalPoints += amount;
    meta.preview[talent.tree] += amount;
    meta.treeRows[talent.tree][talent.row] += amount;

    if (amount > 0) {
      meta.lastActiveRow[talent.tree] =
        meta.lastActiveRow[talent.tree] < talent.row
          ? talent.row
          : meta.lastActiveRow[talent.tree];
    } else {
      if (
        talent.row === meta.lastActiveRow[talent.tree] &&
        meta.treeRows[talent.tree][talent.row] === 0
      ) {
        meta.lastActiveRow[talent.tree]--;
      }
    }
    return meta;
  }
}
