import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Talent } from '../../../../components/body/pages/talent-calculator/models/talents.model';
import {
  TalentCalculatorState,
  TalentMetaInfo
} from '../talent-calculator.reducer';
import { Store } from '@ngrx/store';
import { TalentCalculatorQuery } from '../talent-calculator.selector';
import * as talentHelper from './talent-calculator.helper';

@Injectable()
export class TalentCalculatorService {
  state: TalentCalculatorState;

  constructor(
    private store$: Store<TalentCalculatorState>,
    private location: Location
  ) {
    store$
      .select(TalentCalculatorQuery.getState)
      .subscribe(data => (this.state = data));
  }

  /**
   * Return Talents with details attached.
   * @param details Talent details
   */
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

  /**
   * Return Talents with tooltips attached.
   * @param talents array of Talents
   * @param tooltips array of Talent tooltips
   */
  getTalentTooltips(talents: Talent[], tooltips: any): Talent[] {
    talents.forEach((talent, index) => (talent.tooltip = tooltips[index]));

    return talents;
  }

  /**
   * Return state after altering talents and meta information using url parameters.
   * @param talents array of Talents
   * @param classId current class Id in url param
   * @param talentUrlParam encoded talent url queryParam
   * @param glyphUrlParam encoded glyph url queryParam
   */
  getTalentStateFromUrl(
    talents: Talent[],
    classId: number,
    talentUrlParam: string,
    glyphUrlParam: string
  ): TalentCalculatorState {
    const state: TalentCalculatorState = {
      talents: [],
      meta: {
        talentUrlParam: talentUrlParam,
        glyphUrlParam: glyphUrlParam,
        talentPointsArray: [],
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

    const pointsFromUrl = talentHelper.decodeTalents(talentUrlParam);

    Object.keys(talents).forEach(i => {
      const p = (pointsFromUrl && pointsFromUrl[i]) || 0;
      const talent = talents[i];
      state.meta.talentPointsArray.push(0);

      if (p > 0) {
        this.updateMetaInfo(state.meta, talent, p);
      }

      talent.curRank = p;
    });

    state.talents = talents;

    return state;
  }

  /**
   * Return true iff a point can be added to Talent.
   * @param talent Talent
   */
  canAddPoint(talent: Talent): boolean {
    return talentHelper.canAddPoint(this.state, talent);
  }

  /**
   * Return true iff a point can be removed from Talent.
   * @param talent Talent
   */
  canRemovePoint(talent: Talent): boolean {
    return talentHelper.canRemovePoint(this.state, talent);
  }

  /**
   * Return the updated talent meta information after points are added to talent.
   * @param talent Talent
   * @param points amount of points to be added to talent
   */
  getUpdatedTalentMetaInfo(talent: Talent, points: number): TalentMetaInfo {
    const meta = Object.assign({}, this.state.meta);

    this.updateMetaInfo(meta, talent, points);

    // Change url params every time meta data is updated
    this.location.replaceState(
      `talent/${meta.classId}?talents=${meta.talentUrlParam}&glyphs=${
        meta.glyphUrlParam
      }`
    );

    return meta;
  }

  /**
   * Updates the meta information after points are added to talent's curRank.
   * @param meta Talent Meta information
   * @param talent Talent
   * @param points Points being added to talent
   */
  private updateMetaInfo(
    meta: TalentMetaInfo,
    talent: Talent,
    points: number
  ): void {
    meta.talentPointsArray[talent.id] += points;
    meta.totalPoints += points;
    meta.preview[talent.tree] += points;
    meta.treeRows[talent.tree][talent.row] += points;
    meta.talentUrlParam = talentHelper.encodeTalents(meta.talentPointsArray);

    if (points > 0) {
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
  }
}
