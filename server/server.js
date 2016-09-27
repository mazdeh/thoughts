var express = require('express');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var auth = require('./../src/constants/auth');
// var AlchemyAPI = require('alchemy-api');

var app = express();
var PORT = process.env.PORT || 3000;

require('./passport')(passport);

app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(express.static(__dirname + '/../dist'));

app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

// var alchemy = new AlchemyAPI(auth.alchemyKey);

require('./routes')(app, passport);

app.listen(PORT, function() {
  console.log('Listening on PORT: ', PORT);
});
