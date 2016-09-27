var aws = require('aws-sdk');
var uuid = require('node-uuid');
// var bcrypt = require('bcrypt');

// TODO: hopefully move to separate file passport.js
// var passport = require('passport');

aws.config.loadFromPath('./aws_config.json');
var docClient = new aws.DynamoDB.DocumentClient({ region: 'us-west-2' });

module.exports = function(app, passport) {
  // saves to mongodb
  app.post('/users/new', passport.authenticate('local-signup', {
    successRedirect: '/blah',
    failureRedirect: '/register'
  }))

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

}
