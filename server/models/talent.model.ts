const mongoose = require('mongoose');

// char Schema
const TalentSchema = mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  class_id: { type: Number, required: true },
  talent_param: { type: String, required: true },
  glyph_param: { type: String, required: false },
  preview: { type: Array, required: false },
  spec: { type: String, required: false },
  description: { type: String, required: false },
  created: { type: Date }
});

export const Talent = mongoose.model('Talent', TalentSchema);

module.exports.saveTalent = function(newTalent, callback) {
  newTalent.save(callback);
};

// import { Typegoose, prop } from 'typegoose';

// class TalentModel extends Typegoose {
//   @prop({ required: true })
//   username: string;

//   @prop({ required: true })
//   name: string;

//   @prop({ required: true })
//   class_id: number;

//   @prop({ required: true })
//   talent_param: string;

//   @prop({ required: false })
//   glyph_param: string;

//   @prop({ required: false })
//   preview: number[];

//   @prop({ required: false })
//   spec: string;

//   @prop({ required: false })
//   description: string;

//   @prop({ default: Date.now() })
//   created: Date;
// }

// export const Talent = new TalentModel().getModelForClass(TalentModel, {
//   schemaOptions: { versionKey: false }
// });
