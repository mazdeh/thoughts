var uuid = require('node-uuid');
var Thought = require('./models/thought');
var User = require('./models/user');

module.exports = function(app, passport) {
  app.post('/user/new',
    passport.authenticate('local-signup', {
      successRedirect: '/',
      failureRedirect: '/register',
      failureFlash: true
    }),
    function(req, res) {
      console.log('registration req: ', req.session);
    }
  )

  app.post('/user/login',
    passport.authenticate('local-login', {
      failureRedirect: '/'
    }),
    function(req, res) {
      req.session.userId = req.user._id;
      console.log('req.session', req.session);
      res.status(200).send(req.user);
    }
  )

  app.post('/user/logout', function(req, res) {
    req.session.destroy();
  })

  app.get('/user/:id/thoughts', function(req, res) {
    const userId = req.params.id;

    Thought.find({ 'userId': userId }, function(err, thoughts) {
      if (err) {
        console.log('DB ERR: ', err);
      }

      if (!thoughts) {
        console.log('User has no Thoughts in db!')
        // res.status(200).send(thoughts);
      }

      else {
        res.status(200).send(thoughts);
      }
    })
  })

  app.post('/user/thoughts/save/:id', function(req, res) {
    const id = req.params.id;
    const rawContent = req.body.rawContent;

    if (req.session.passport) {
      const userId = req.session.passport.user;
    } else {
      console.log('User not authed!');
    }

    Thought.findOne({ 'id': id }, function(err, thought) {
      if (err) {
        console.log('DB ERR: ', err)
        res.sendStatus(500);
      }

      if (!thought) {
        var newThought = new Thought();
        newThought.userId = userId;
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

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()) {
    console.log('he is');
    return next();
  }

  console.log('he isnt');
	// if they aren't redirect them to the home page
	res.redirect('/');
}
