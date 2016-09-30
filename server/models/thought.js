var dbCreds = require('../dbcreds');
var mongoose = require('mongoose');
// mongoose.connect('mongodb://' + dbCreds.user + ':' + dbCreds.pass +'@ds041536.mlab.com:41536/thoughts-db')
// https://github.com/Automattic/mongoose/issues/4291
mongoose.Promise = global.Promise;

var thoughtSchema = mongoose.Schema({
  userId: String,
  id: String,
  rawContent: Object,
  lastSaved: Date,
  dateCreated: Date
})

module.exports = mongoose.model('Thought', thoughtSchema);
