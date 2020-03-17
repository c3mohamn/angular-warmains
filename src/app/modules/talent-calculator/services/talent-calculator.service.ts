import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Classes, ClassesColors, ClassesSpecs } from '../../../models/classes.enum';

@Injectable()
export class TalentCalculatorService {
  constructor(private http: HttpClient) {}

  /**
   * Return class name of currently selected class.
   * @param classId current class Id
   */
  getClassName(classId: number): string {
    return Classes[classId];
  }

  /**
   * Return class color of currently selected class.
   * @param classId current class Id
   */
  getClassColor(classId: number): string {
    return ClassesColors[Classes[classId]];
  }

  /**
   * Return specialization name of tree with id treeId & of class with classId.
   * @param treeId id of TalentTree tree
   * @param classId current class id
   */
  getClassSpec(treeId: number, classId: number): string {
    const specs = new ClassesSpecs();
    return specs.getClassSpec(classId, treeId);
  }
}
