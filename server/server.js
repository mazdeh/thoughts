var express = require('express');
var bodyParser = require('body-parser');
var auth = require('./src/constants/auth');
var aws = require('aws-sdk');
var AlchemyAPI = require('alchemy-api');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // for parsing application/json
app.use(express.static('./dist'));

var alchemy = new AlchemyAPI(auth.alchemyKey);

// Amazon stuff
aws.config.loadFromPath('./aws_config.json');
// TODO: store region in a aws config file somewhere
var db = new aws.DynamoDB({ region: 'us-west-2'});
var docClient = new aws.DynamoDB.DocumentClient({ region: 'us-west-2' });

app.get('/thoughts/:id', function(req, res) {
  const id = req.params.id;
  console.log('Getting thought with id: ', id);

  var params = {
    RequestItems: {
      'thoughts' : {
        Keys: [
          {
            id: id
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

app.post('/thoughts/new', function(req, res) {
  const id = req.body.id;
  const contentObj = JSON.stringify(req.body.contentObj);
  const contentText = req.body.contentText;

  console.log('Storing a new thought with id: ', )

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

app.post('/thoughts/save/:id', function(req, res) {
  console.log('Saving thought with id: ');
})

app.listen(PORT, function() {
  console.log('Listening on PORT: ', PORT);
});