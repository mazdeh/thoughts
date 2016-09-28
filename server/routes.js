var uuid = require('node-uuid');
var db = require('./dbcreds');
var mongoose = require('mongoose');
mongoose.connect(db.url);
var Thought = require('./models/thought');

module.exports = function(app, passport) {
  app.post('/users/new', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
  }))

  app.post('users/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login'
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

  app.delete('/thoughts/delete/:id', function(req, res) {
    const id = req.params.id;
    console.log('Deleting Thought with ID: ', id);

    Thought.remove({ 'id': id }, function(err) {
      if(err) {
        console.log('ERR: ', err);
        res.sendStatus(500);
      } else {
        console.log('Deleted Thought with ID: ', id);
        res.sendStatus(200);
      }
    })
  })

}
