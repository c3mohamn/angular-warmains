var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//User Schema
var UserSchema = mongoose.Schema({
    user_name: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String},
    reset_password_token: {type: String},
    role: {type: Number},
    created: { type: Date },
    last_seen: { type: Date }
});

UserSchema.pre('save', function(next) {
  var user = this;
  var SALT_FACTOR = 10;
  // hashes password if it was modified.
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByUsername = function(username, callback) {
  var query = {username: username};
  User.findOne(query, callback);
}

module.exports.getUserByEmail = function(email, callback) {
  var query = {email: email};
  User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if(err) throw err;
    callback(null, isMatch);
  });
}