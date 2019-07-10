const express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);

// Send all other requests to Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => console.log(`Running on localhost: ${port}.`));

module.exports = app;
