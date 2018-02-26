const express = require('express'),
      router = express.Router(),
      User = require('../models/user'),
      jwt = require('jsonwebtoken'),
      jwtSecret = 'butts';

// Get all Users
router.get('/getAll', (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.status(501).send();
    } else {
      res.status(200).send(users);
      console.log(users);
    }
  });
});

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

        res.status(200).send(newUser);
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
              var token = jwt.sign({username: username, role: user.role}, jwtSecret, {
                expiresIn: 60*60*24*7
              });

              // Save token in db
              user.token = token;
              user.save(err => {
                if (err) throw err;
                console.log(user);
              });

              res.status(200).send({token: token});
          } else {
              console.log("Invalid Password");
              res.status(400).send('Incorrect password.');
          }
      });
    }
  })
});

// Refresh Token
router.post('/refreshToken', function(req, res, next) {
  var token = req.body.token;

  if (token) {
    jwt.verify(token, jwtSecret, function (err, decoded) {
      if (err) {
        res.status(401).end('Token expired.');
      } else {
        console.log(decoded);
        // Check if token username exists.
        User.findOne({ username: decoded.username}, function (err, user) {
          if (err) throw err;
          if (!user) {
            res.status(400).end('This username does not exist.');
          }
          console.log('matching user: ', user);
          //Lets give the user a new token.
          var newToken = jwt.sign({
            username: user.username,
            role: user.role
          }, jwtSecret, {
            expiresIn: 60*60*24*7
          });
          res.status(200).send({token: newToken});
        });
      }
    });
  }
  else {
    console.log('No user logged in.');
  }
});

module.exports = router;
