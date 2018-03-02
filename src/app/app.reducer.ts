import { Reducer, combineReducers } from 'redux';
import { UserState, UserReducer } from './states/user/user.reducer';
// import { TalentState, TalentReducer } from './states/talent';

export interface AppState {
  user: UserState;
  // talents: TalentState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  user: UserReducer
  // talents: TalentReducer,
});

export default rootReducer;
