import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Talent } from '../../models/talent.model';

@Injectable()
export class ApiTalentService {
  result: Talent[];

  constructor(private _http: Http) {}

  getTalents() {
    return this._http
      .get('/api/talent/getAll')
      .map(result => (this.result = result.json().data));
  }

  createTalent() {}

  deleteTalent() {}
}
