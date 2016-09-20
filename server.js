var express = require('express');
var bodyParser = require('body-parser');
var auth = require('./src/constants/auth');
var aws = require('aws-sdk');

var app = express();
aws.config.loadFromPath('./aws_config.json');
var db = new aws.DynamoDB({ region: 'us-west-2'});

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

  var dbData = {
    TableName: 'thoughts',
    Item: {
      id: {'S': 'vahid'},
      text: {'S': text}
    }
  }
  db.putItem(dbData, function(err, data) {
    if (err) {
      console.log("couldn't save data to db.")
      console.log('err: ', err);
    } else {
      console.log("form data saved");
    }
  })

  alchemy.emotions(text, {}, (err, response) => {
    if (err) throw err;
    res.json(JSON.stringify(response, null, 2));
  })
})

app.listen(PORT, function() {
  console.log('Listening on PORT: ', PORT);
});
