import * as mongoose from 'mongoose';

export interface ITalent extends mongoose.Document {
  username: string;
  name: string;
  classId: string;
  talentParam: string;
  glyphParam: string;
  preview: number[];
  spec: string;
  description: string;
  created: Date;
}

const TalentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  class_id: { type: Number, required: true },
  talent_param: { type: String, required: true },
  glyph_param: { type: String, required: false },
  preview: { type: Array, required: false },
  spec: { type: String, required: false },
  description: { type: String, required: false },
  created: { type: Date, default: Date.now() }
});

export const Talent = mongoose.model<ITalent>('Talent', TalentSchema);
