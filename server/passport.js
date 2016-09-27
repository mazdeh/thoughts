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
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },

  function(req, username, password, done) {
    process.nextTick(function() {
      User.findOne({ 'local.email' : username }, function(err, user) {
        if (err) {
          console.log('Err: ', err);
          done(err);
        }

        // user already exists in db!
        if(user) {
          console.log('user exists');
          done(null, false);
        }

        // create new user in db!
        else {
          var newUser = new User();
          newUser.local.email = username;
          newUser.local.password = newUser.generateHash(password);

          newUser.save(function (err) {
            if (err) throw err;
            return done(null, newUser);
          })
        }
      })
    })
  }

))



}
