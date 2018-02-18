const express = require('express'),
      router = express.Router(),
      Talent = require('../models/talent');

// Get all Talents
router.get('/getAll', (req, res) => {
  Talent.find((err, talents) => {
    if (err) {
      res.status(501).send();
    } else {
      res.status(200).send({ data: talents });
    }
  });
});

module.exports = router;
