import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Talent } from './_models/talents.model';
import { TalentCalculatorState } from '../../_states/talent/talent.reducer';

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

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(AppStore) private store: Redux.Store<AppState>
  ) {
    this.classId = this.getClassId();
  }

  // initialize talent calculator base
  init() {
    console.log('initializing talent calculator...');

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
    console.log(`Adding ${count} points to talent ${talentId}.`);
    const talent: Talent = this.getTalentState(talentId);
    talent.curRank += count;
    this.store.dispatch(TalentActions.addTalentPoint(talent));
  }

  removePoint(talentId: number, count: number = 1) {
    console.log(`Removing ${count} points from talent ${talentId}.`);
    const talent: Talent = this.getTalentState(talentId);
    talent.curRank -= count;
    this.store.dispatch(TalentActions.removeTalentPoint(talent));
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
      // not a number, redirect to base class
      this.router.navigate(['/talent/1']);
      return 1;
    }

    return classId;
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
      spec: '',
      talents: []
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
    this.addPoint(0, 1);
    this.removePoint(1, 3);
    this.resetTalentPoints(0);
  }

  // gets talent information from state
  private getTalentState(talentId: number): Talent {
    return this.store.getState().talentCalculator.talents[talentId];
  }

  private getTalentDetails() {
    return this.http.get('./assets/data/talents/talent-details.json');
  }

  private getTalentTooltips() {
    return this.http.get('./assets/data/talents/tooltips/' + this.classId + '.json');
  }
}
