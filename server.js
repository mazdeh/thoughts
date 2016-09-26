var express = require('express');
var bodyParser = require('body-parser');
var auth = require('./src/constants/auth');
var uuid = require('node-uuid');
var AlchemyAPI = require('alchemy-api');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // for parsing application/json
app.use(express.static('./dist'));

var alchemy = new AlchemyAPI(auth.alchemyKey);

require('./routes')(app);

app.listen(PORT, function() {
  console.log('Listening on PORT: ', PORT);
});
