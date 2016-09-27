var uuid = require('node-uuid');
var dbCreds = require('./dbcreds');
var mongoose = require('mongoose');
mongoose.connect('mongodb://' + dbCreds.user + ':' + dbCreds.pass +'@ds041536.mlab.com:41536/thoughts-db')
var Thought = require('./models/thought');

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    console.log('Im here')
  })

  app.post('/users/new', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
  }))

  app.get('/thoughts/all', function(req, res) {
    Thought.find({}, function(err, thoughts) {
      if (err) {
        console.log('ERR: ', err);
        res.sendStatus(500);
      } else {
        console.log('Thoughts Received!');
        res.send(thoughts);
      }
    })
  })

  app.post('/thoughts/new/:id', function(req, res) {
    const id = req.params.id;
    console.log('Creating a new Thought Item with ID: ', id);

    var newThought = new Thought();
    newThought.id = id;

    newThought.save(function(err) {
      if (err) {
        console.log('ERR Could not save new thought: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
        console.log('Saved Thought with ID: ', id, 'to db!');
      }
    })
  })

  app.post('/thoughts/update/:id', function(req, res) {
    const id = req.params.id;
    const rawContent = req.body.rawContent;
    console.log('Updating thought with id: ', id)
    console.log('entityMap: ', rawContent);
    Thought.update({ 'id': id }, {$set: { rawContent: rawContent }}, function(err) {
      if (err) {
        console.log('ERR: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
        console.log('Updated Thought with ID: ', id);
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
