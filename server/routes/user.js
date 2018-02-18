const express = require('express'),
      router = express.Router();
      User = require('../models/user');

// Get all Users
router.get('/getAll', (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.status(501).send();
    } else {
      res.status(200).send({ data: users });
    }
  });
});

module.exports = router;
