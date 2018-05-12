import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Talent } from '../models/talents.model';
import {
  TalentCalculatorState,
  TalentMetaInfo,
  TalentSelector
} from '../../../../../states/talent/talent.reducer';
import {
  Classes,
  ClassesColors,
  ClassesSpecs
} from '../../../../../models/classes.enum';
import { canAddPoint, canRemovePoint } from '../helpers/talent-tree.helper';

import * as Redux from 'redux';
import * as TalentActions from '../../../../../states/talent/talent.actions';
import { AppStore } from '../../../../../states/app.store';
import { AppState } from '../../../../../states/app.reducer';
import { Router } from '@angular/router';
import { TalentService } from '../../../../../modules/api/services/talent.service';

@Injectable()
export class TalentCalculatorService {
  talentDetails: any;
  talentTooltips: any;
  classId = 1;
  className: string;
  classColor: string;
  pointsRemaining = 71;
  talentMeta: TalentMetaInfo;

  constructor(
    private http: HttpClient,
    private router: Router,
    private talentService: TalentService,
    @Inject(AppStore) private store: Redux.Store<AppState>
  ) {
    store.subscribe(() => this.updateState());
  }

  updateState() {
    const state = this.store.getState();
    this.talentMeta = TalentSelector.getTalentMeta(state);
    this.pointsRemaining = 71 - this.talentMeta.totalPoints;
    this.classId = this.talentMeta.classId;
  }

  // initialize talent calculator base
  init(classId: number = null) {
    this.classId = classId ? classId : this.classId;
    this.className = this.getClassName();
    this.classColor = this.getClassColor();

    console.log(`initializing talent calculator for ${this.classId}...`);

    this.talentService.getTalentTooltips(this.classId).subscribe(
      tooltips => {
        this.talentTooltips = tooltips;
        this.talentService.getTalentDetails(this.classId).subscribe(
          details => {
            this.talentDetails = details;
            this.loadTalentDetailsState(details);
          },
          error => console.log(error)
        );
      },
      error => console.log(error)
    );
  }

  addPoint(talentId: number, count: number = 1) {
    if (canAddPoint(this.store.getState().talentCalculator, talentId)) {
      this.store.dispatch(TalentActions.addTalentPoint(talentId));
    }
  }

  removePoint(talentId: number, count: number = 1) {
    if (canRemovePoint(this.store.getState().talentCalculator, talentId)) {
      this.store.dispatch(TalentActions.removeTalentPoint(talentId));
    }
  }

  resetTalentPoints(tree: number = null) {
    console.log('Resetting talent points');
    const talents: Talent[] = this.store.getState().talentCalculator.talents;

    if (tree) {
      talents.forEach(val => {
        if (val.tree === tree) {
          val.curRank = 0;
        }
      });
    } else {
      talents.forEach(val => (val.curRank = 0));
    }

    this.store.dispatch(TalentActions.resetTalentPoints(talents));
  }

  // converts path to url
  getClassId(url: string = null): number {
    const path = url || this.router.url;
    const classId = Number(path.slice(path.indexOf('/', 2) + 1));

    if (isNaN(classId) || classId === 10 || classId > 11 || classId < 1) {
      // not valid a number, redirect to base class
      this.router.navigate(['/talent/1']);
      return 1;
    }

    return classId;
  }

  isTalentActive(talentId: number): boolean {
    const talent = this.getTalentStateById(talentId);
    const pointsInTree = this.store.getState().talentCalculator.preview[
      talent.tree
    ];
    const totalPoints = this.store.getState().talentCalculator.meta.totalPoints;

    if (talent.requires) {
      const requiredTalent = this.getTalentStateById(talent.requires);
      if (requiredTalent.curRank !== requiredTalent.maxRank) {
        return true;
      }
    }

    return (
      talent.row * 5 > pointsInTree ||
      (talent.curRank === 0 && totalPoints === 71)
    );
  }

  getLastActiveRow(tree: number): number {
    return this.store.getState().talentCalculator.lastActiveRow[tree];
  }

  getClassName(classId: number = this.classId): string {
    return Classes[classId];
  }

  getClassColor(classId: number = this.classId): string {
    return ClassesColors[Classes[classId]];
  }

  getClassSpec(treeId: number, classId: number = this.classId): string {
    const specs = new ClassesSpecs();
    return specs.getClassSpec(this.classId, treeId);
  }

  getTalentTooltip(classId: number = this.classId): string[] {
    return this.store.getState().talentCalculator.talents[classId].tooltip;
  }

  getTalentPreview(): number[] {
    if (this.store.getState().talentCalculator) {
      return this.store.getState().talentCalculator.preview;
    } else {
      return [0, 0, 0];
    }
  }

  getTalentPointsUsed(): number {
    if (this.store.getState().talentCalculator) {
      return this.store.getState().talentCalculator.meta.totalPoints;
    } else {
      return 0;
    }
  }

  getTalentState(tree: number, row: number, col: number): Talent {
    if (!this.talentDetails) {
      return null;
    }

    const talents = this.store.getState().talentCalculator.talents;

    // Get index of matching talent
    const index = Object.keys(talents).find(
      key =>
        talents[key].row === row &&
        talents[key].col === col &&
        talents[key].tree === tree
    );

    return talents[index];
  }

  ///////////////////////////////
  ////// PRIVATE FUNCTIONS //////
  ///////////////////////////////

  private loadTalentDetailsState(details: any) {
    const meta: TalentMetaInfo = {
      spec: '',
      talentUrlParam: '',
      glyphUrlParam: '',
      classId: this.classId,
      totalPoints: 0
    };

    const state: TalentCalculatorState = {
      meta: meta,
      preview: [0, 0, 0],
      treeRows: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      talents: [],
      lastActiveRow: [0, 0, 0]
    };

    // Add talent details to list of talents in state
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
        tooltip: this.talentTooltips[+key],
        allows: talent.allows,
        requires: talent.requires,
        arrows: talent.arrows
      };

      state.talents.push(newTalent);
    });

    this.store.dispatch(TalentActions.loadTalentDetails(state));
  }

  getTalentStateById(talentId: number): Talent {
    return this.store.getState().talentCalculator.talents[talentId];
  }
}
