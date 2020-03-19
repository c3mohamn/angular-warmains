const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, unique: true },
  token: { type: String },
  role: { type: Number },
  created: { type: Date },
  last_seen: { type: Date }
});

UserSchema.pre('save', function(next) {
  const user = this;
  const SALT_FACTOR = 10;
  // hashes password if it was modified.
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    bcrypt.hash(user.password, salt, function(hashError, hash) {
      if (hashError) {
        return next(hashError);
      }
      user.password = hash;
      next();
    });
  });
});

export const User = mongoose.model('User', UserSchema);

module.exports.getUserByUsername = function(username, callback) {
  const query = { username: username };
  User.findOne(query, callback);
};

module.exports.getUserByEmail = function(email, callback) {
  const query = { email: email };
  User.findOne(query, callback);
};

module.exports.getUserByEmailOrUsername = function(username, email, callback) {
  const query = { $or: [{ username: username }, { email: email }] };
  User.findOne({ $or: [{ username: username }, { email: email }] }, callback);
};

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) {
      throw err;
    }
    callback(null, isMatch);
  });
};
