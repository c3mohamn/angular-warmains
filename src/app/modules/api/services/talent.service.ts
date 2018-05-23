import { Injectable } from '@angular/core';
import { Talent } from '../../../models/talent.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { TalentMetaInfo } from '../../state/talent-calculator/talent-calculator.reducer';
import { Glyph } from '../../../components/body/pages/talent-calculator/models/talents.model';

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
      .get<any[]>('./assets/data/talents/talent-details.json')
      .pipe(
        map(data => data),
        publishReplay(1),
        refCount(),
        map(data => data[classId])
      );
  }

  /**
   * Return array of talent tooltips for class with classId.
   * @param classId class id
   */
  getTalentTooltips(classId: number): Observable<any[]> {
    return this.http
      .get<any[]>(`./assets/data/talents/tooltips/${classId}.json`)
      .pipe(map(data => data), publishReplay(1), refCount());
  }

  /**
   * Return array of glyphs for class with classId.
   * @param classId class Id
   */
  getGlyphDetails(classId: number, type: number): Observable<Glyph[]> {
    return this.http
      .get<Glyph[]>('./assets/data/talents/glyphs.json')
      .pipe(
        map(data => data),
        publishReplay(1),
        refCount(),
        map(data => data[classId][type]),
        map(glyphs => Object.keys(glyphs).map(g => glyphs[g]))
      );
  }
}
