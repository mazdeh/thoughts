var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    })
  })

  passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true
  }, function(req, username, password, done) {
      process.nextTick(function() {
        User.findOne({ 'local.username' : username }, function(err, user) {
          if (err) {
            console.log('Err: ', err);
            done(err);
          }

          // user already exists in db!
          if(user) {
            console.log('User ', username, ' already exists.');
            done(null, false);
          }

          // create new user in db!
          else {
            var newUser = new User();
            newUser.local.username = username;
            newUser.local.password = newUser.generateHash(password);
            newUser.save(function (err) {
              if (err) {
                console.log('Could not save user to db.')
                throw err
              }
              console.log('New user saved to db.');
              return done(null, newUser);
            })
          }
        })
      })
    }
  ))


  passport.use('local-login', new LocalStrategy({
    passReqToCallback: true
  }, function(req, username, password, done) {
    User.findOne({ 'local.username': username }, function(err, user) {
      if (err) {
        console.log('ERR: ', err);
        return done(err);
      }

      if(!user) {
        console.log('Cannot find user!')
        return done(null, false);
      }

      if(!user.validPassword(password)) {
        console.log('Invalid pass.');
        return done(null, false);
      }
      req.session.name = "vahid has to go";
      console.log('pass.session: ', req.session);
      return done(null, user);
    })

  }
  ))
}
