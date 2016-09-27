var dbCreds = require('../dbcreds');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
mongoose.connect('mongodb://' + dbCreds.user + ':' + dbCreds.pass +'@ds041536.mlab.com:41536/thoughts-db')

// https://github.com/Automattic/mongoose/issues/4291
mongoose.Promise = global.Promise;

var userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String
  }
})

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
