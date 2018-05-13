import { Injectable } from '@angular/core';
import { Talent } from '../../../components/body/pages/talent-calculator/models/talents.model';
import { TalentCalculatorState } from './talent-calculator.reducer';

@Injectable()
export class TalentCalculatorService {
  constructor() {}

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
}