const express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  expressValidator = require('express-validator');

const app = express();
const port = process.env.PORT || 3000;
const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// Express validator
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

// API location
app.use('/api', api);

// Send all other requests to Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => console.log(`Running on localhost: ${port}.`));

module.exports = app;
