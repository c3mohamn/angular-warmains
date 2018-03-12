import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TalentCalculatorService {
  constructor(private http: HttpClient) { }

  getTalentDetails(): Observable<any> {
    console.log('getting talent details');
    return this.http.get('./assets/data/talents/talent-details.json');
  }
}
