import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import { User, UserQuery } from '../models/user.model';

const jwtSecret = 'butts';

const router = express.Router();

// Register User
router.post('/register', (req, res) => {
  const username = req.body.username.toLowerCase(),
    password = req.body.password.toLowerCase(),
    email = req.body.email.toLowerCase();

  check('username', 'No username entered.').notEmpty();
  check('username', 'Username must be 3 to 20 characters long.').isLength({
    min: 3,
    max: 20
  });
  check('password', 'Password must be 5 to 20 characters long.').isLength({
    min: 5,
    max: 20
  });
  check('email', 'Invalid Email.').isEmail();

  const errors = validationResult(req).array();

  if (errors.length) {
    res.status(400).send(errors);
  } else {
    console.log('no errors');
    // Check if username or email taken already
    UserQuery.getUserByEmailOrUsername(username, email, function(err: any, user: { username: any; email: any }) {
      if (err) {
        throw err;
      }
      if (user) {
        // Username or email already in use
        if (user.username === username) {
          console.log(username, ' already taken.');
          res.status(400).send('Username ' + username + ' is already being used.');
        } else if (user.email === email) {
          console.log(email, ' is already being used.');
          res.status(400).send('Email ' + email + ' is already being used.');
        }
      } else {
        console.log('creating new user: ');
        // Creating a new user with given input.
        const newUser = new User({
          username: username,
          password: password,
          email: email,
          created: new Date(),
          lastSeen: new Date(),
          role: 1
        });

        newUser.save((saveError: any) => {
          if (saveError) {
            throw saveError;
          }
          console.log(newUser);
        });

        res.status(200).send(userViewModel(newUser));
      }
    });
  }
});

// Login User
router.post('/login', function(req, res, next) {
  const username = req.body.username.toLowerCase();
  const email = req.body.email.toLowerCase();
  const password = req.body.password.toLowerCase();

  UserQuery.getUserByEmailOrUsername(
    username,
    email,
    (
      err: any,
      user: {
        password: string;
        username: string;
        role: any;
        token: string;
        lastSeen: Date;
        save: (arg0: (saveError: any) => void) => void;
      }
    ) => {
      if (err) {
        throw err;
      }
      if (!user) {
        res.status(404).send('This username or email does not exist.');
      } else {
        UserQuery.comparePassword(password, user.password, (comparePassError: any, isMatch: any) => {
          if (comparePassError) {
            throw comparePassError;
          }
          if (isMatch) {
            console.log('Logging in as ' + user.username + '.');
            // Get a access token for user & send to front-end
            const token = jwt.sign({ username: user.username, role: user.role }, jwtSecret, {
              expiresIn: 60 * 60 * 24 * 7
            });

            // Save token in db
            user.token = token;
            user.lastSeen = new Date();
            user.save((saveError: any) => {
              if (saveError) {
                throw saveError;
              }
              console.log(user);
            });

            res.status(200).send(userViewModel(user));
          } else {
            console.log('Invalid Password');
            res.status(400).send('Incorrect password.');
          }
        });
      }
    }
  );
});

// remove users token (logout)
router.post('/removeToken', function(req, res, next) {
  const username = req.body.username;

  UserQuery.getUserByUsername(
    username,
    (err: any, user: { token: string; lastSeen: Date; save: (arg0: (saveError: any) => void) => void }) => {
      if (err) {
        throw err;
      }
      if (!user) {
        res.status(400).send(`Could not find user with username ${username} in db.`);
      } else {
        user.token = '';
        user.lastSeen = new Date();
        user.save((saveError: any) => {
          if (saveError) {
            throw saveError;
          }
          console.log(`Removed token from ${username}.`);
        });
        res.status(200).send(userViewModel(user));
      }
    }
  );
});

// validates current Token
router.post('/validateToken', function(req, res, next) {
  const token = req.body.token;

  if (token) {
    jwt.verify(token, jwtSecret, function(jwtError: any, decoded: { username: any }) {
      if (jwtError) {
        res.status(401).send('Token expired.');
      } else {
        console.log(decoded);
        // Check if token username exists.
        User.findOne({ username: decoded.username }, function(userNameError, user) {
          if (userNameError) {
            throw userNameError;
          }
          if (!user) {
            res.status(400).send('This username does not exist.');
          } else if (user.token !== token) {
            res.status(401).send('Token does not match token in db');
          } else {
            // Give user new token
            const newToken = jwt.sign(
              {
                username: user.username,
                role: user.role
              },
              jwtSecret,
              {
                expiresIn: 60 * 60 * 24 * 7
              }
            );

            user.token = newToken;
            user.lastSeen = new Date();
            user.save(userSaveError => {
              if (userSaveError) {
                throw userSaveError;
              }
              console.log('saved new token to user');
            });

            res.status(200).send(userViewModel(user));
          }
        });
      }
    });
  } else {
    console.log('No token retrieved, user not logged in?');
  }
});

function userViewModel(user: any) {
  return {
    id: user._id,
    email: user.email,
    username: user.username,
    token: user.token,
    role: user.role
  };
}

export default router;
