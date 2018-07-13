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

router.post('', (req, res) => {
  var talent = new Talent({
    username: req.body.username || null,
    name: req.body.name || null,
    class_id: parseInt(req.body.class_id) || 0,
    talent_param: req.body.talent_param || null,
    glyph_param: req.body.glyph_param || null,
    preview: req.body.preview || null,
    spec: req.body.spec || null,
    description: req.body.description || null,
    created: Date.now()
  });

  // Error checking talent fields
  req
    .checkBody('name', 'Name must be between 2 and 20 characters long.')
    .isLength({ min: 2, max: 20 });
  req.checkBody('class_id', 'Invalid class Id.').isInt();
  req.checkBody('talent_param', 'Invalid talents.').isLength({ max: 50 });
  req.checkBody('glyph_param', 'Invalid talents.').isLength({ max: 50 });
  req
    .checkBody(
      'description',
      'Talent description cannot exceed 100 characters.'
    )
    .isLength({ min: 0, max: 100 });

  var errors = req.validationErrors();

  if (errors) {
    console.log(errors);
    res.statusMessage = 'Invalid input.';
    res.status(400).send(errors);
  } else {
    Talent.find(
      { username: talent.username, name: talent.name },
      (err, result) => {
        if (err) throw err;

        // Talent already exists
        if (result.length > 0) {
          res.status(400).send(`Talent ${talent.name} already exists`);
        } else {
          Talent.saveTalent(talent, (err, talent) => {
            if (err) {
              console.log(err);
              res.status(500).send();
            }
            console.log(talent);
            res.status(200).send(talent);
          });
        }
      }
    );
  }
});

// Get talents for current logged in user
router.get('', (req, res) => {
  const username = req.query.username;

  if (!username) {
    console.log('No username was given: ', username);
    res.status(404).send('No username was given.');
  } else {
    Talent.find({ username: username }, (err, talents) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      }

      res.status(200).send(talents);
    });
  }
});

router.delete('', function(req, res) {
  const id = req.body.id;
  const name = req.body.name;

  console.log('talent: ', id, name);

  Talent.findOneAndRemove({ _id: id }, err => {
    if (err) {
      console.log(err);
      res.status(500).send();
    }

    res.status(200).send(`Talent ${name} has been deleted`);
  });
});

module.exports = router;
