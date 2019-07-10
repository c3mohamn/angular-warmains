const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const options = {
  reconnectInterval: 500,
  reconnectTries: 5,
  useNewUrlParser: true,
  useCreateIndex: true
};

mongoose.connect(
  'mongodb://admin:password@ds239968.mlab.com:39968/angular-warmains-test',
  options
);

const talent = require('./talent'),
  user = require('./user');
// char = require('./char'),
// raid = require('./raid');

router.use('/talent', talent);
router.use('/user', user);
// router.use('/char', char);
// router.use('/raid', raid);

module.exports = router;
