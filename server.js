var express = require('express');
var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.static('./dist'));

app.get('/save', function(req, res) {
  console.log('do something with the request.')
})

app.listen(PORT, function() {
  console.log('Listening on PORT: ', PORT);
});
