import { Action } from '@ngrx/store';
import { User, UserForm } from '../../../models/user.model';

export enum UserActionTypes {
  GET_USER = '[User] GET me',
  GET_USER_SUCCESS = '[User] GET me success',
  USER_LOGIN = '[User] login',
  USER_LOGOUT = '[User] logout',
  USER_ERROR = '[User] error'
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
}

export type UserActionsUnion =
  | UserActions.GetUser
  | UserActions.GetUserSuccess
  | UserActions.Userlogin
  | UserActions.UserLogout
  | UserActions.UserError;
