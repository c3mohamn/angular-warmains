import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TalentTree, Talent } from './_models/talents.model';
import { TalentCalculatorState } from '../../_states/talent/talent.reducer';

import * as Redux from 'redux';
import * as TalentActions from '../../_states/talent/talent.actions';
import { AppStore } from '../../app.store';
import { AppState } from '../../app.reducer';

@Injectable()
export class TalentCalculatorService {
  state: TalentCalculatorState;

  constructor(
    private http: HttpClient,
    @Inject(AppStore) private store: Redux.Store<AppState>
  ) { }

  getTalentDetails(): Observable<any> {
    console.log('getting talent details');
    return this.http.get('./assets/data/talents/talent-details.json');
  }

  loadTalentDetailsState(rawDetails: any, classId: number) {
    const details = rawDetails[classId];
    const state: TalentCalculatorState = {
      classId: classId,
      name: '',
      description: '',
      talentUrl: '',
      glyphUrl: '',
      preview: [0, 0, 0],
      spec: '',
      talents: []
    };

    const tree1: TalentTree = {
      name: '',
      key: 0,
      talents: []
    };

    const tree2: TalentTree = {
      name: '',
      key: 1,
      talents: []
    };

    const tree3: TalentTree = {
      name: '',
      key: 2,
      talents: []
    };

    console.log(details);

    // for (let key in details) {
    //   const talent = details[key];

    //   if (talent.tree == 0) {

    //   }
    //   console.log(details[key]);
    // }

    this.store.dispatch(TalentActions.loadTalentDetails(state));
  }
}
