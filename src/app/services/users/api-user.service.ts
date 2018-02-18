import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../../models/user.model';

@Injectable()
export class ApiUserService {
  result: User[];

  constructor(private _http: Http) { }

  getUsers() {
    return this._http.get('/api/users')
      .map(result => this.result = result.json().data);
  }

}
