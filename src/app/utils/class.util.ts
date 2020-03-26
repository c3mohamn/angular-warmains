import { ClassNames, ClassColors, ClassSpecs } from '../models/class.constant';

export namespace ClassUtil {
  /**
   * Return class name of currently selected class.
   *
   * @param classId current class Id
   */
  export const getClassName = (classId: number): string => {
    return ClassNames[classId];
  };

  /**
   * Return class color of currently selected class.
   *
   * @param classId current class Id
   */
  export const getClassColor = (classId: number): string => {
    return ClassColors[ClassNames[classId]];
  };

  /**
   * Return specialization name of tree with id treeId & of class with classId.
   *
   * @param treeId id of TalentTree tree
   * @param classId current class id
   */
  export const getClassTalentTreeSpecName = (treeId: number, classId: number): string => {
    return ClassSpecs[getClassName(classId)][treeId];
  };

  /**
   * Returns a list of talent tree specilization names.
   *
   * @param classId current class id
   */
  export const getClassTalentTreeSpecNames = (classId: number): string[] => {
    return ClassSpecs[getClassName(classId)];
  };
}
