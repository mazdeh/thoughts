var express = require('express');
var bodyParser = require('body-parser');
var auth = require('./src/constants/auth');
var aws = require('aws-sdk');
// var Map = require('immutable').Map;

var app = express();

// Amazon stuff
aws.config.loadFromPath('./aws_config.json');
var db = new aws.DynamoDB({ region: 'us-west-2'});
var docClient = new aws.DynamoDB.DocumentClient({ region: 'us-west-2' });

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // for parsing application/json
app.use(express.static('./dist'));

var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI(auth.alchemyKey);

app.get('/save', function(req, res) {
  console.log('do something with the request.')
})

app.get('/thoughts', function(req, res) {
  console.log('getting thoughts...');
  var params = {
    RequestItems: {
      'thoughts' : {
        Keys: [
          {
            id: '1d195c08-7e00-40b1-abdc-885e3490b5ed'
          }
        ]
      }
    }
  }
  docClient.batchGet(params, function(err, data) {
    if (err) {
      console.log('err: ', err);
    } else {
      console.log('data: ', data);
      res.send(data);
    }
  })
})

app.post('/alscore', function(req, res) {
  const id = req.body.id;
  const contentObj = JSON.stringify(req.body.contentObj);
  const contentText = req.body.contentText;

  var dbData = {
    TableName: 'thoughts',
    Item: {
      id:  id,
      contentObj: contentObj
    }
  }

  docClient.put(dbData, function(err, data) {
    console.log('dbData: ', dbData);
    if (err) {
      console.log('err: ', err);
    } else {
      console.log("form data saved");
    }
  })

  // alchemy.emotions(contentText, {}, (err, response) => {
  //   if (err) throw err;
  //   res.json(JSON.stringify(response, null, 2));
  // })
})

app.listen(PORT, function() {
  console.log('Listening on PORT: ', PORT);
});
