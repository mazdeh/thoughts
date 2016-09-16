var express = require('express');
var bodyParser = require('body-parser');
var auth = require('./src/constants/auth');

var app = express();

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // for parsing application/json
app.use(express.static('./dist'));

// alternative API - https://uclassify.com/
var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI(auth.alchemyKey);

app.get('/save', function(req, res) {
  console.log('do something with the request.')
})

app.post('/alscore', function(req, res) {
  var text = req.body.text;

  alchemy.emotions(text, {}, (err, response) => {
    if (err) throw err;
    res.json(JSON.stringify(response, null, 2));
  })
})

app.listen(PORT, function() {
  console.log('Listening on PORT: ', PORT);
});
