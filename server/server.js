var express = require('express');
var path = require('path');
var passport = require('passport');
var bodyParser = require('body-parser');
var session = require('express-session');
var sessionStore = require('connect-mongo')(session);
var auth = require('./../src/constants/auth');
// var AlchemyAPI = require('alchemy-api');

var db = require('./dbcreds');
var mongoose = require('mongoose');
mongoose.connect(db.url);

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../dist'));

require('./passport')(passport);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true}));

const sessionMgr = session({
  secret: 'keyboardcat',
  resave: false,
  saveUninitialized: true,
  unset: 'destroy',
  cookie: {
    maxAge: 86400,
    secure: false
  },
  store: new sessionStore({
    mongooseConnection: mongoose.connection,
    ttl: 14 * 24 * 60 * 60
  })
});

app.use(sessionMgr);

app.use(passport.initialize());
app.use(passport.session());

require('./routes')(app, passport);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})

app.listen(PORT, function() {
  console.log('Listening on PORT: ', PORT);
});
