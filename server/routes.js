var uuid = require('node-uuid');
// var db = require('./dbcreds');
// var mongoose = require('mongoose');
// mongoose.connect(db.url);
var Thought = require('./models/thought');

module.exports = function(app, passport) {
  app.post('/users/new', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
  }))

  app.post('/users/login',
    passport.authenticate('local-login'),
    function(req, res) {
      req.session.username = req.user.local.username;
      res.status(200).send(req.user.username);
    }
  )

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

  // app.post('/thoughts/new/:id', function(req, res) {
  //   const id = req.params.id;
  //   const rawContent = req.body.rawContent;
  //   console.log('Creating a new Thought Item with ID: ', id);
  //
  //   var newThought = new Thought();
  //   newThought.id = id;
  //   console.log('rawContent: ', rawContent);
  //   newThought.rawContent = rawContent;
  //
  //   newThought.save(function(err) {
  //     if (err) {
  //       console.log('ERR Could not save new thought: ', err);
  //       res.sendStatus(500);
  //     } else {
  //       res.sendStatus(200);
  //       console.log('Saved Thought with ID: ', id, 'to db!');
  //     }
  //   })
  // })

  app.post('/thoughts/update/:id', function(req, res) {
    const id = req.params.id;
    const rawContent = req.body.rawContent;

    Thought.findOne({ 'id': id }, function(err, thought) {
      if (err) {
        console.log('DB ERR: ', err)
        res.sendStatus(500);
      }

      if (!thought) {
        var newThought = new Thought();
        newThought.id = id;
        newThought.rawContent = rawContent;
        newThought.dateCreated = Date.now();
        newThought.lastSaved = new Date();

        newThought.save(function(err) {
          if (err) {
            console.log('ERR Could not save new thought to db: ', err)
            res.sendStatus(500)
          } else {
            res.sendStatus(200)
            console.log('Saved new Thought with ID ', id);
          }
        })
      }

      else {
        thought.rawContent = rawContent;
        thought.lastSaved = new Date();
        thought.save(function(err) {
          if (err) {
            console.log('ERR Could not update Thought ', err)
            res.sendStatus(500);
          } else {
            res.sendStatus(200)
            console.log('Updated thought with ID: ', id);
          }
        })
      }
    })
  })

  app.delete('/thoughts/delete/:id', function(req, res) {
    const id = req.params.id;

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
