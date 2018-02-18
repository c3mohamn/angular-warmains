const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose');

mongoose.connect('mongodb://admin:password@ds239968.mlab.com:39968/angular-warmains-test');
const db = mongoose.connection;

const talent = require('./talent'),
      user = require('./user'),
      char = require('./char'),
      raid = require('./raid');

router.use('/talent', talent);
router.use('/user', user);
router.use('/char', char);
router.use('/raid', raid);

module.exports = router;
