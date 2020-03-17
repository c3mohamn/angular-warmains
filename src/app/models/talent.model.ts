export interface NewTalent {
  username: string;
  name: string;
  class_id: string;
  talent_param: string;
  glyph_param: string;
  preview: number[];
  spec: string;
  description: string;
}

export interface Talent extends NewTalent {
  id: string;
  created: Date;
}
