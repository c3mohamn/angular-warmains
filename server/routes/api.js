const express = require('express'),
      router = express.Router(),
      mongojs = require('mongojs'),
      db = mongojs('mongodb://admin:password@ds239968.mlab.com:39968/angular-warmains-test');

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

// Get users
router.get('/users', (req, res) => {
  db.collection('users')
    .find((err, users) => {
      if (err) {
        sendError(err, res);
      } else {
        response.data = users;
        res.json(response);
      }
    });
});

module.exports = router;
