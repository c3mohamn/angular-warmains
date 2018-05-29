import { Injectable, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import {
  Talent,
  Glyph
} from '../../../../components/body/pages/talent-calculator/models/talents.model';
import {
  TalentCalculatorState,
  TalentMetaInfo
} from '../talent-calculator.reducer';
import { Store } from '@ngrx/store';
import { TalentCalculatorQuery } from '../talent-calculator.selector';
import * as talentHelper from './talent-calculator.helper';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TalentCalculatorService implements OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  state: TalentCalculatorState;

  constructor(
    private store$: Store<TalentCalculatorState>,
    private location: Location
  ) {
    store$
      .select(TalentCalculatorQuery.getState)
      .pipe(takeUntil(this.ngUnsubscribe))
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
      glyphs: new Array<Glyph>(6),
      meta: {
        talentUrlParam: talentUrlParam,
        glyphUrlParam: glyphUrlParam,
        talentPointsArray: [],
        glyphsArray: new Array<number>(6),
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

    const pointsFromUrl = talentHelper.decodeTalentUrlParam(talentUrlParam);

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
   * Return true iff glyph can be added to glyph state at index.
   * @param glyph Glyph
   * @param index index in Glyph state where glyph is to be added to
   */
  canAddGlyph(glyph: Glyph, index): boolean {
    return talentHelper.canAddGlyph(this.state.glyphs, glyph, index);
  }

  /**
   * Return new glyph state with glyph added to index.
   * @param glyph Glyph
   * @param index index in Glyph state where glyph is to be added to
   */
  addGlyph(glyph: Glyph, index: number): Glyph[] {
    const glyphs = Object.assign(new Array<Glyph>(6), this.state.glyphs);

    glyphs[index] = glyph;

    return glyphs;
  }

  /**
   * Return new glyph state with glyph removed from idnex.
   * @param index index where glyph is to be removed from
   */
  removeGlyph(index: number): Glyph[] {
    const glyphs = Object.assign(new Array<Glyph>(6), this.state.glyphs);

    glyphs[index] = null;

    return glyphs;
  }

  /**
   * Return the updated talent meta information after points are added to talent.
   * @param talent Talent
   * @param points amount of points to be added to talent
   */
  getUpdatedTalentMetaInfo(talent: Talent, points: number): TalentMetaInfo {
    const meta = Object.assign({}, this.state.meta);

    this.updateMetaInfo(meta, talent, points);
    this.updateUrlParams(meta.classId, meta.talentUrlParam, meta.glyphUrlParam);

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
    meta.talentUrlParam = talentHelper.getTalentUrlParam(
      meta.talentPointsArray
    );

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

  /**
   * Change the url parameters to reflect the meta information of talent calculator.
   * @param classId current class id
   * @param talentParam url talent parameter
   * @param glyphParam url glyph parameter
   */
  private updateUrlParams(
    classId: number,
    talentParam: string,
    glyphParam: string
  ): void {
    this.location.replaceState(
      `talent/${classId}?talents=${talentParam}&glyphs=${glyphParam}`
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
