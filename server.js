var express = require('express');
var bodyParser = require('body-parser');
var auth = require('./src/constants/auth');
var uuid = require('node-uuid');
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

app.post('/users/new', function(req, res) {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  console.log('email, ', email, username, password);

  var params = {
    TableName: "users",
    Item: {
      id: uuid.v4(),
      email: email,
      username: username,
      password: password
    }
  }

  docClient.put(params, function(err, data) {
    if (err) {
      console.log('err: ', err);
      res.sendStatus(500);
    } else {
      console.log('data: ', data);
      res.send(data);
    }
  })
})


app.get('/thoughts/all', function(req, res) {
  var params = {
    TableName: "thoughts"
  }

  docClient.scan(params, function(err, data) {
    if (err) {
      console.log('err: ', err);
      res.sendStatus(500);
    } else {
      console.log('data: ', data);
      res.send(data);
    }
  })
})

app.post('/thoughts/new/:id', function(req, res) {
  const id = req.params.id;
  console.log('Creating a new Thought Item with ID: ', id);

  var params = {
    TableName: 'thoughts',
    Item: {
      id: id
    }
  }

  docClient.put(params, function(err, data) {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    } else {
      res.sendStatus(200);
      console.log('Created new Thought');
    }
  })

})

app.post('/thoughts/update/:id', function(req, res) {
  const id = req.params.id;
  const rawContent = req.body.rawContent;

  console.log('Updating thought with id: ', id)

  var params = {
    TableName: 'thoughts',
    Key: {
      id:  id
    },
    UpdateExpression: "set rawContent = :r",
    ExpressionAttributeValues: {
      ":r": rawContent
    }
  }

  docClient.update(params, function(err, data) {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    } else {
      res.sendStatus(200);
      console.log("Saved to db!");
    }
  })

  // alchemy.emotions(contentText, {}, (err, response) => {
  //   if (err) throw err;
  //   res.json(JSON.stringify(response, null, 2));
  // })
})

app.post('/thoughts/delete/:id', function(req, res) {
  const id = req.params.id;
  console.log('Deleting Thought with ID: ', id);
  const params = {
    TableName: 'thoughts',
    Key: {
      id: id
    }
  }
  docClient.delete(params, function(err, data) {
    if (err) {
      console.log(err)
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  })
})

app.listen(PORT, function() {
  console.log('Listening on PORT: ', PORT);
});
