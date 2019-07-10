import { Injectable } from '@angular/core';
import { Talent, NewTalent } from '../../shared/models/talent.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { Glyph } from '../models/talents.model';

@Injectable()
export class TalentService {
  talentApi = '/api/talent';

  constructor(private http: HttpClient) {}

  getAllTalents(): Observable<Talent[]> {
    return this.http.get<Talent[]>(`${this.talentApi}/getAll`);
  }

  /**
   * Return all talents for user with username.
   * @param username user's unique username
   */
  getTalents(username: string): Observable<Talent[]> {
    return this.http.get<Talent[]>(this.talentApi, {
      params: { username: username }
    });
  }

  /**
   * Save talent for user with user id in db.
   * @param talent NewTalent
   */
  saveTalent(talent: NewTalent): Observable<Talent> {
    return this.http.post<Talent>(this.talentApi, talent);
  }

  /**
   * Delete talent with talentId in db.
   * @param talentId talent id
   */
  deleteTalent(talentId: string): Observable<void> {
    return this.http.delete<void>(this.talentApi, {
      params: { id: talentId }
    });
  }

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
      .pipe(
        map(data => data),
        publishReplay(1),
        refCount()
      );
  }

  /**
   * Return object of glyphs for class with classId.
   * @param classId class Id
   */
  getGlyphDetails(classId: number): Observable<any> {
    return this.http.get<any>('./assets/data/talents/glyphs.json').pipe(
      map(data => data[classId]),
      // combine object
      map(data => Object.assign({}, data['1'], data['2']))
    );
  }

  /**
   * Return array of glyphs for class with classId.
   * @param classId class Id
   * @param type major or minor
   */
  getGlyphDetailsByType(classId: number, type: number): Observable<Glyph[]> {
    return this.http.get<any>('./assets/data/talents/glyphs.json').pipe(
      map(data => data[classId][type]),
      // turn to array
      map((glyphs: Glyph[]) => Object.keys(glyphs).map(g => glyphs[g]))
    );
  }
}
