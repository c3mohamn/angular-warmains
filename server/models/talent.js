var mongoose = require('mongoose');

//char Schema
var TalentSchema = mongoose.Schema({
    user_name: {type: String, required: true},
    name: {type: String, required: true},
    class_id: {type: Number, required: true},
    talent_param: {type: String, required: true},
    glyph_param: {type: String, required: false},
    preview: {type: Array, required: false},
    spec: {type: String, required: false},
    description: {type: String, required: false},
    created: {type: Date}
});

var Talent = module.exports = mongoose.model('Talent', TalentSchema);

module.exports.saveTalent = function(newTalent, callback) {
    newTalent.save(callback);
}
