import { Reducer, combineReducers } from 'redux';
import { UserState, UserReducer } from './user/user.reducer';
import {
  TalentCalculatorState,
  TalentReducer
} from './talent/talent.reducer';

export interface AppState {
  user: UserState;
  talentCalculator: TalentCalculatorState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  user: UserReducer,
  talentCalculator: TalentReducer
});

export default rootReducer;
