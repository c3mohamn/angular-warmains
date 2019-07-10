export interface Talent {
  name: string;
  id: number;
  row: number;
  col: number;
  curRank: number;
  maxRank: number;
  tree: number;
  tooltip: string[];
  allows: number[];
  requires: number;
  arrows: TalentTreeArrow[];
  iconPath: string;
}

export interface TalentTreeArrow {
  filename: string;
  type: string;
}

export interface Glyph {
  name: string;
  description: string;
  icon: string;
  type: number;
  uid: number;
  id: number;
}
