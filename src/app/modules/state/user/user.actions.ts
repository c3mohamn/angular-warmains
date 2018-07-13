import { Action } from '@ngrx/store';
import { User, UserForm } from '../../../models/user.model';
import { Talent } from '../../../models/talent.model';

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
  ADD_TALENT = '[User] add talent',
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

    constructor() {}
  }

  export class DialogClosed implements Action {
    readonly type = UserActionTypes.DIALOG_CLOSED;

    constructor() {}
  }

  export class AddTalent implements Action {
    readonly type = UserActionTypes.ADD_TALENT;

    constructor(public payload: Talent) {}
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
  | UserActions.AddTalent
  | UserActions.RemoveTalent
  | UserActions.DialogClosed;
