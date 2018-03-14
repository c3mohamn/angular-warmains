export interface TalentCalculator {
  name: string;
  description: string;
  talentUrl: string;
  glyphUrl: string;
  classId: number;
  preview: number[];
  spec: string;
}

export interface Talent {
  name: string;
  id: string;
  row: number;
  col: number;
  curRank: number;
  maxRank: number;
  tree: number;
  tooltip: string;
  allows: number[];
  requires: number;
  arrows: TalentTreeArrow[];
}

export interface TalentTreeArrow {
  filename: string;
  type: string;
}
