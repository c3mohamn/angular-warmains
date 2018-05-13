import { Injectable } from '@angular/core';
import { Talent } from '../../../components/body/pages/talent-calculator/models/talents.model';

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
}
