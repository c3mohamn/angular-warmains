export interface TalentCalculator {
  name: string;
  description: string;
  talentUrl: string;
  glyphUrl: string;
  classId: number;
  preview: number[];
  spec: string;
}

export interface TalentTree {
  name: string;
  key: number;
  talents: Talent[];
}

export interface Talent {
  name: string;
  id: number;
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
