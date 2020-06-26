import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  email: string;
  token: string;
  role: number;
  created: Date;
  lastSeen: Date;
}

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, unique: true },
  token: { type: String },
  role: { type: Number },
  created: { type: Date },
  lastSeen: { type: Date }
});

// Setup password hash
UserSchema.pre<IUser>('save', function(next) {
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

export const User = mongoose.model<IUser>('User', UserSchema);

export namespace UserQuery {
  export const getUserByUsername = (username: string, callback: any) => {
    const query = { username: username };
    User.findOne(query, callback);
  };

  export const getUserByEmail = function(email: string, callback: any) {
    const query = { email: email };
    User.findOne(query, callback);
  };

  export const getUserByEmailOrUsername = function(username: string, email: string, callback: any) {
    const query = { $or: [{ username: username }, { email: email }] };
    User.findOne(query, callback);
  };

  export const getUserById = function(id: string, callback: any) {
    User.findById(id, callback);
  };

  export const comparePassword = (givenPassword: string, hashedPassword: string, callback: any) => {
    bcrypt.compare(givenPassword, hashedPassword, function(err, isMatch) {
      if (err) {
        throw err;
      }
      callback(null, isMatch);
    });
  };
}
