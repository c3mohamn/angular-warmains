import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Talent } from '../models/talents.model';
import {
  Classes,
  ClassesColors,
  ClassesSpecs
} from '../../../../../models/classes.enum';
import { canAddPoint, canRemovePoint } from '../helpers/talent-tree.helper';

@Injectable()
export class TalentCalculatorService {
  constructor(private http: HttpClient, private router: Router) {}

  // isTalentActive(talentId: number): boolean {
  //   const talent = this.getTalentStateById(talentId);
  //   const pointsInTree = this.store.getState().talentCalculator.preview[
  //     talent.tree
  //   ];
  //   const totalPoints = this.store.getState().talentCalculator.meta.totalPoints;

  //   if (talent.requires) {
  //     const requiredTalent = this.getTalentStateById(talent.requires);
  //     if (requiredTalent.curRank !== requiredTalent.maxRank) {
  //       return true;
  //     }
  //   }

  //   return (
  //     talent.row * 5 > pointsInTree ||
  //     (talent.curRank === 0 && totalPoints === 71)
  //   );
  // }

  getClassName(classId: number): string {
    return Classes[classId];
  }

  getClassColor(classId: number): string {
    return ClassesColors[Classes[classId]];
  }

  getClassSpec(treeId: number, classId: number): string {
    const specs = new ClassesSpecs();
    return specs.getClassSpec(classId, treeId);
  }
}
