var express = require('express');
var app = express();
var contact = require('./routes/contact')
var routes = require('./routes/index');
var about = require('./routes/about')
app.set('view engine', 'ejs');

app.use('/', routes);
app.use('/about', about);
app.use('/contact', contact);

app.locals.title = "Carter Capocaccia" ;

app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});

// handling 404 errors
app.use(function(err, req, res, next) {
  if(err.status !== 404) {
    return next();
  }

  res.send(err.message || '** no unicorns here **');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});
