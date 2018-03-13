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

      if (newTalent.tree === 0) {
        tree1.talents.push(newTalent);
      } else if (newTalent.tree === 1) {
        tree2.talents.push(newTalent);
      } else {
        tree3.talents.push(newTalent);
      }
    });

    state.talents.push(tree1);
    state.talents.push(tree2);
    state.talents.push(tree3);

    this.store.dispatch(TalentActions.loadTalentDetails(state));
  }
}
