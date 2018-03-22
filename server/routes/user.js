const express = require('express'),
      router = express.Router(),
      User = require('../models/user'),
      jwt = require('jsonwebtoken'),
      jwtSecret = 'butts';

// Register User
router.post('/register', (req, res) => {
  var username = req.body.username.toLowerCase(),
      password = req.body.password.toLowerCase(),
      email = req.body.email.toLowerCase();

  req.checkBody('username', 'No username entered.').notEmpty();
  req.checkBody('username', 'Username must be 3 to 20 characters long.').isLength({min:3, max: 20});
  req.checkBody('password', 'Password must be 5 to 20 characters long.').isLength({min:5, max: 20});
  req.checkBody('email', 'Invalid Email.').isEmail();

  var errors = req.validationErrors();

  if (errors) {
    console.log(errors);
    res.status(400).send(errors);
  } else {
    console.log('no errors');
    // Check if username or email taken already
    User.getUserByEmailOrUsername(username, email, function(err, user) {
      if (err) throw err;
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
        //Creating a new user with given input.
        var newUser = new User({
            username: username,
            password: password,
            email: email,
            created: new Date(),
            last_seen: new Date(),
            role: 1
        });

        newUser.save(err => {
          if (err) throw err;
          console.log(newUser);
        });

        res.status(200).send(userViewModel(newUser));
      }
    });
  }
});

// Login User
router.post('/login', function(req, res, next) {
  var username = req.body.username.toLowerCase();
  var email = req.body.email.toLowerCase();
  var password = req.body.password.toLowerCase();

  User.getUserByEmailOrUsername(username, email, (err, user) => {
    if(err) throw err;
    if(!user) {
        res.status(400).send('This username or email does not exist.');
    }
    else {
      User.comparePassword(password, user.password, (err, isMatch) => {
          if(err) throw err;
          if(isMatch) {
              console.log("Logging in as " + user.username + ".");
              // Get a access token for user & send to front-end
              var token = jwt.sign({username: user.username, role: user.role}, jwtSecret, {
                expiresIn: 60*60*24*7
              });

              // Save token in db
              user.token = token;
              user.last_seen = new Date();
              user.save(err => {
                if (err) throw err;
                console.log(user);
              });

              res.status(200).send(userViewModel(user));
          } else {
              console.log("Invalid Password");
              res.status(400).send('Incorrect password.');
          }
      });
    }
  });
});

// remove users token (logout)
router.post('/removeToken', function (req, res, next) {
  var username = req.body.username;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(400).send(`Could not find user with username ${username} in db.`);
    } else {
      user.token = '';
      user.last_seen = new Date();
      user.save(err => {
        if (err) throw err;
        console.log(`Removed token from ${username}.`);
      });
      res.status(200).send(userViewModel(user));
    }
  });
});

// validates current Token
router.post('/validateToken', function(req, res, next) {
  var token = req.body.token;

  if (token) {
    jwt.verify(token, jwtSecret, function (err, decoded) {
      if (err) {
        res.status(401).send('Token expired.');
      } else {
        console.log(decoded);
        // Check if token username exists.
        User.findOne({ username: decoded.username}, function (err, user) {
          if (err) throw err;
          if (!user) {
            res.status(400).send('This username does not exist.');
          } else if (user.token != token) {
            res.status(401).send('Token does not match token in db');
          } else {
            // Give user new token
            var newToken = jwt.sign({
              username: user.username,
              role: user.role
            }, jwtSecret, {
              expiresIn: 60*60*24*7
            });

            user.token = newToken;
            user.last_seen = new Date();
            user.save(err => {
              if (err) throw err;
              console.log('saved new token to user');
            });

            res.status(200).send(userViewModel(user));
          }
        });
      }
    });
  }
  else {
    console.log('No token retrieved, user not logged in?');
  }
});

function userViewModel(user) {
  return {
    id: user._id,
    email: user.email,
    username: user.username,
    token: user.token,
    role: user.role
  };
}

module.exports = router;
