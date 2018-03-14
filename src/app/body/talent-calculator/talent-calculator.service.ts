import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Talent } from './_models/talents.model';
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

  loadTalentDetailsState(details: any, classId: number) {
    console.log(details);
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

    // Add talent details to list of talents in state
    Object.keys(details).forEach(key => {
      const talent = details[key];

      const newTalent: Talent = {
        name: talent.name,
        id: key,
        row: talent.row,
        col: talent.col,
        curRank: 0,
        maxRank: talent.maxRank,
        tree: talent.tree,
        tooltip: '',
        allows: talent.allows,
        requires: talent.requires,
        arrows: talent.arrows
      };

      state.talents.push(newTalent);
    });

    this.store.dispatch(TalentActions.loadTalentDetails(state));
  }
}
