import { Injectable } from '@angular/core';
import { Talent } from '../../../models/talent.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TalentService {
  constructor(private http: HttpClient) {}

  getTalents(): Observable<Talent[]> {
    return this.http.get<Talent[]>('/api/talent/getAll');
  }

  createTalent() {}

  deleteTalent() {}

  getTalentDetails(): Observable<any> {
    return this.http.get<any>('./assets/data/talents/talent-details.json');
  }

  getTalentTooltips(classId: number): Observable<any> {
    return this.http.get<any>(`./assets/data/talents/tooltips/${classId}.json`);
  }
}
