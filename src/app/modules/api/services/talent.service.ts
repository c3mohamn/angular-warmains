import { Injectable } from '@angular/core';
import { Talent } from '../../../models/talent.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TalentMetaInfo } from '../../state/talent-calculator/talent-calculator.reducer';

@Injectable()
export class TalentService {
  constructor(private http: HttpClient) {}

  getTalents(): Observable<Talent[]> {
    return this.http.get<Talent[]>('/api/talent/getAll');
  }

  /**
   * Save talent for user with user id in db.
   * @param meta talent meta information
   * @param userId user id
   */
  saveTalent(meta: TalentMetaInfo, userId: string): void {}

  /**
   * Delete talent with talentId in db.
   * @param talentId talent id
   */
  deleteTalent(talentId: string): void {}

  /**
   * Return array talent details for class with classId.
   * @param classId class id
   */
  getTalentDetails(classId: number): Observable<any[]> {
    return this.http
      .get<any>('./assets/data/talents/talent-details.json')
      .pipe(map(data => data[classId]));
  }

  /**
   * Return array of talent tooltips for class with classId.
   * @param classId class id
   */
  getTalentTooltips(classId: number): Observable<any[]> {
    return this.http
      .get<any>(`./assets/data/talents/tooltips/${classId}.json`)
      .pipe(map(data => data));
  }
}
