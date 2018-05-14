import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Talent } from '../models/talents.model';
import {
  Classes,
  ClassesColors,
  ClassesSpecs
} from '../../../../../models/classes.enum';

@Injectable()
export class TalentCalculatorService {
  constructor(private http: HttpClient) {}

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
