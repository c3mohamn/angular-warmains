import { Action } from '@ngrx/store';
import { User, UserForm } from '../../../models/user.model';
import { Talent, NewTalent } from '../../../models/talent.model';
import { TalentMetaInfo } from '../talent-calculator/talent-calculator.reducer';

export enum UserActionTypes {
  GET_USER = '[User] GET me',
  GET_USER_SUCCESS = '[User] GET me success',
  USER_LOGIN = '[User] login',
  USER_LOGOUT = '[User] logout',
  USER_ERROR = '[User] error',
  OPEN_SAVE_TALENT_DIALOG = '[User] opening save talent dialog',
  DIALOG_CLOSED = '[User] closing save dialog',
  GET_USER_TALENTS = '[User] GET talents',
  GET_USER_TALENTS_SUCCESS = '[User] got talents',
  GET_USER_CHARS = '[User] GET characters',
  GET_USER_CHARS_SUCCESS = '[User] got characters',
  SAVE_TALENT = '[User] saving talent',
  SAVE_TALENT_SUCCESS = '[User] saved talent',
  SAVE_TALENT_ERROR = '[User] could not save talent',
  REMOVE_TALENT = '[User] remove talent'
}

export namespace UserActions {
  export class GetUser implements Action {
    readonly type = UserActionTypes.GET_USER;

    constructor(public payload: string) {}
  }

  export class GetUserSuccess implements Action {
    readonly type = UserActionTypes.GET_USER_SUCCESS;

    constructor(public payload: User) {}
  }

  export class Userlogin implements Action {
    readonly type = UserActionTypes.USER_LOGIN;

    constructor(public payload: UserForm) {}
  }

  export class UserLogout implements Action {
    readonly type = UserActionTypes.USER_LOGOUT;
  }

  export class UserError implements Action {
    readonly type = UserActionTypes.USER_ERROR;

    constructor(public payload: any) {}
  }

  export class GetUserTalents implements Action {
    readonly type = UserActionTypes.GET_USER_TALENTS;

    constructor(public payload: string) {}
  }

  export class GetUserTalentsSuccesss implements Action {
    readonly type = UserActionTypes.GET_USER_TALENTS_SUCCESS;

    constructor(public payload: Talent[]) {}
  }

  export class OpenSaveTalentDialog implements Action {
    readonly type = UserActionTypes.OPEN_SAVE_TALENT_DIALOG;

    constructor(public payload: [TalentMetaInfo, string]) {}
  }

  export class DialogClosed implements Action {
    readonly type = UserActionTypes.DIALOG_CLOSED;

    constructor() {}
  }

  export class SaveTalent implements Action {
    readonly type = UserActionTypes.SAVE_TALENT;

    constructor(public payload: NewTalent) {}
  }

  export class SaveTalentSuccess implements Action {
    readonly type = UserActionTypes.SAVE_TALENT_SUCCESS;

    constructor(public payload: Talent) {}
  }

  export class SaveTalentError implements Action {
    readonly type = UserActionTypes.SAVE_TALENT_ERROR;

    constructor(public payload: any) {}
  }

  export class RemoveTalent implements Action {
    readonly type = UserActionTypes.REMOVE_TALENT;

    constructor(public payload: string) {}
  }
}

export type UserActionsUnion =
  | UserActions.GetUserSuccess
  | UserActions.UserLogout
  | UserActions.UserError
  | UserActions.GetUserTalentsSuccesss
  | UserActions.SaveTalentSuccess
  | UserActions.SaveTalentError
  | UserActions.RemoveTalent
  | UserActions.DialogClosed;
