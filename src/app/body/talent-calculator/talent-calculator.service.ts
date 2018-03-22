import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Talent } from './_models/talents.model';
import { TalentCalculatorState } from '../../_states/talent/talent.reducer';
import { Classes, ClassesColors, ClassesSpecs } from '../../_models/classes.enum';
import { canAddPoint, canRemovePoint } from './_helpers/talent-tree.helper';

import * as Redux from 'redux';
import * as TalentActions from '../../_states/talent/talent.actions';
import { AppStore } from '../../app.store';
import { AppState } from '../../app.reducer';
import { Router } from '@angular/router';

@Injectable()
export class TalentCalculatorService {
  talentDetails: any;
  talentTooltips: any;
  classId: number;
  className: string;
  classColor: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(AppStore) private store: Redux.Store<AppState>
  ) {
    this.classId = this.getClassId();
  }

  // initialize talent calculator base
  init(classId: number = null) {
    this.classId = classId ? classId : this.classId;
    this.className = this.getClassName();
    this.classColor = this.getClassColor();

    console.log(`initializing talent calculator for ${this.classId}...`);

    this.getTalentTooltips().subscribe(
      data => this.talentTooltips = data,
      error => console.log(error)
    );

    if (this.talentDetails) {
      this.loadTalentDetailsState(this.talentDetails[this.classId]);
    } else {
      this.getTalentDetails().subscribe(
        data => {
          this.talentDetails = data;
          this.loadTalentDetailsState(data[this.classId]);
        },
        error => console.log(error)
      );
    }
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
      talents.forEach(val => val.curRank = 0 );
    }

    this.store.dispatch(TalentActions.resetTalentPoints(talents));
  }

  // converts path to url
  getClassId(): number {
    const path = this.router.url;
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
    const pointsInTree = this.store.getState().talentCalculator.preview[talent.tree];
    const totalPoints = this.store.getState().talentCalculator.totalPoints;

    if (talent.requires) {
      const requiredTalent = this.getTalentStateById(talent.requires);
      if (requiredTalent.curRank !== requiredTalent.maxRank) {
        return true;
      }
    }

    return talent.row * 5 > pointsInTree ||
      talent.curRank === 0 && totalPoints === 71;
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
    return specs.getClassSpec(classId, treeId);
  }

  getTalentState(tree: number, row: number, col: number): Talent {
    if (!this.talentDetails) {
      return null;
    }

    const talents = this.store.getState().talentCalculator.talents;

    // Get index of matching talent
    const index = Object.keys(talents).find(key =>
      talents[key].row === row && talents[key].col === col && talents[key].tree === tree
    );

    return talents[index];
  }

  ///////////////////////////////
  ////// PRIVATE FUNCTIONS //////
  ///////////////////////////////

  private loadTalentDetailsState(details: any) {
    const state: TalentCalculatorState = {
      classId: this.classId,
      name: '',
      description: '',
      talentUrl: '',
      glyphUrl: '',
      preview: [0, 0, 0],
      treeRows: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      spec: '',
      talents: [],
      totalPoints: 0,
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
        tooltip: [],
        allows: talent.allows,
        requires: talent.requires,
        arrows: talent.arrows
      };

      state.talents.push(newTalent);
    });

    this.store.dispatch(TalentActions.loadTalentDetails(state));
  }

  private getTalentStateById(talentId: number): Talent {
    return this.store.getState().talentCalculator.talents[talentId];
  }

  private getTalentDetails() {
    return this.http.get('./assets/data/talents/talent-details.json');
  }

  private getTalentTooltips() {
    return this.http.get('./assets/data/talents/tooltips/' + this.classId + '.json');
  }
}
