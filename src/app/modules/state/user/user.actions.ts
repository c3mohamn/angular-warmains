import { Action } from '@ngrx/store';
import { User } from '../../../models/user.model';

export const USER_GET_ME = '[User] GET me';
export const USER_GET_ME_SUCCESS = '[User] GET me success';
export const USER_CLEAR = '[User] clear';
export const USER_LOGOUT = '[User] logout';
export const USER_ERROR = '[User] error';

export class GetUserMe implements Action {
  readonly type = USER_GET_ME;
}

export class GetUserMeSuccess implements Action {
  readonly type = USER_GET_ME_SUCCESS;

  constructor(public payload: User) {}
}

export class ClearUserMe implements Action {
  readonly type = USER_CLEAR;
}

export class UserLogout implements Action {
  readonly type = USER_LOGOUT;
}

export class UserError implements Action {
  readonly type = USER_ERROR;

  constructor(public payload: any) {}
}

export type ALL = GetUserMe | GetUserMeSuccess | ClearUserMe | UserLogout;
