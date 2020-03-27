import { Injectable, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Talent, Glyph } from '../../talent-calculator/models/talents.model';
import { TalentCalculatorState, TalentMetaInfo } from './talent-calculator.reducer';
import { Store } from '@ngrx/store';
import { TalentCalculatorQuery } from './talent-calculator.selector';
import * as talentHelper from './talent-calculator.util';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable()
export class TalentCalculatorService implements OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  state: TalentCalculatorState;

  constructor(private store$: Store<TalentCalculatorState>, private location: Location) {
    this.store$
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
    talents.forEach(talent => (talent.tooltip = tooltips[talent.id]));

    return talents;
  }

  /**
   * Return state after altering talents and meta information using url parameters.
   * @param talents array of Talents
   * @param classId current class Id in url param
   * @param talentUrlParam encoded talent url queryParam
   * @param glyphUrlParam encoded glyph url queryParam
   * @param glyphs object of glyphs for class with classId
   */
  getTalentStateFromUrl(
    talents: Talent[],
    classId: number,
    talentUrlParam: string,
    glyphUrlParam: string,
    glyphs: any
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

    // update glyph and talents from urlParams

    const talentsFromUrl = talentHelper.decodeTalentUrlParam(talentUrlParam);
    const glyphsFromUrl = talentHelper.decodeGlyphUrlParam(glyphUrlParam);

    if (glyphsFromUrl) {
      glyphsFromUrl.forEach((uid, index) => {
        if (!state.meta.glyphsArray[index]) {
          const glyph = glyphs[uid];
          state.meta.glyphsArray[index] = uid;
          state.glyphs[index] = glyph;
        }
      });
    }

    talents.forEach(talent => {
      const p = (talentsFromUrl && talentsFromUrl[talent.id]) || 0;
      state.meta.talentPointsArray.push(0);

      if (p > 0) {
        this.updateTalentMetaInfo(state.meta, talent, p);
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
   * Return the updated talent meta information after glyph is added/removed.
   * @param index index where glyph is being added/removed from
   * @param glyph Glyph
   * @param adding true iff glyph is being added
   */
  getUpdatedGlyphMetaInfo(index: number, glyph?: Glyph, adding?: boolean): TalentMetaInfo {
    const meta = { ...this.state.meta };

    this.updateGlyphMetaInfo(meta, index, glyph, adding);
    this.updateUrlParams(meta.classId, meta.talentUrlParam, meta.glyphUrlParam);

    return meta;
  }

  /**
   * Return the updated talent meta information after points are added to talent.
   * @param talent Talent
   * @param points amount of points to be added to talent
   */
  getUpdatedTalentMetaInfo(talent: Talent, points: number): TalentMetaInfo {
    const meta = { ...this.state.meta };

    this.updateTalentMetaInfo(meta, talent, points);
    this.updateUrlParams(meta.classId, meta.talentUrlParam, meta.glyphUrlParam);

    return meta;
  }

  /**
   * Return a new talent state after talents are reset for treeId.
   * If no treeId is specified, resets whole talent state.
   * @param treeId id of spec
   */
  resetTalentPoints(treeId?: number): TalentCalculatorState {
    const state = { ...this.state };

    // Reset talent points
    state.talents.forEach((talent, index) => {
      if (talent.tree === treeId) {
        talent.curRank = 0;
        state.meta.talentPointsArray[index] = 0;
      }
    });

    // Reset meta information
    state.meta.totalPoints -= state.meta.preview[treeId];
    state.meta.preview[treeId] = 0;
    state.meta.treeRows[treeId].forEach(value => 0);
    state.meta.spec = '';
    state.meta.lastActiveRow[treeId] = 0;
    state.meta.talentUrlParam = talentHelper.getTalentUrlParam(state.meta.talentPointsArray);

    this.updateUrlParams(state.meta.classId, state.meta.talentUrlParam, state.meta.glyphUrlParam);

    return state;
  }

  /**
   * Updates the meta information after glyph is added/removed.
   * @param meta Talent Meta information
   * @param index index where glyph is being added/removed from
   * @param glyph Glyph
   * @param adding true iff glyph is being added
   */
  private updateGlyphMetaInfo(meta: TalentMetaInfo, index: number, glyph?: Glyph, adding?: boolean): void {
    meta.glyphsArray[index] = adding ? glyph.uid : null;
    meta.glyphUrlParam = talentHelper.getGlyphUrlParam(meta.glyphsArray);
  }

  /**
   * Updates the meta information after points are added to talent's curRank.
   * @param meta Talent Meta information
   * @param talent Talent
   * @param points Points being added to talent
   */
  private updateTalentMetaInfo(meta: TalentMetaInfo, talent: Talent, points: number): void {
    console.log(meta, talent, points);
    meta.talentPointsArray[talent.id] += points;
    meta.totalPoints += points;
    meta.preview[talent.tree] += points;
    meta.treeRows[talent.tree][talent.row] += points;
    meta.talentUrlParam = talentHelper.getTalentUrlParam(meta.talentPointsArray);

    if (points > 0) {
      meta.lastActiveRow[talent.tree] =
        meta.lastActiveRow[talent.tree] < talent.row ? talent.row : meta.lastActiveRow[talent.tree];
    } else {
      if (talent.row === meta.lastActiveRow[talent.tree] && meta.treeRows[talent.tree][talent.row] === 0) {
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
  private updateUrlParams(classId: number, talentParam: string, glyphParam: string): void {
    this.location.replaceState(`talent/${classId}?talents=${talentParam}&glyphs=${glyphParam}`);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
