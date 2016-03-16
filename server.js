var http = require('http');
var express = require('express');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var storage = require('./storage')();
var routes = require('./routes')(storage.insert);

// curl http://localhost:3000
// curl -H "Content-Type: application/json" -X PUT -d '{"username":"marco","password":"polo"}' http://localhost:3000
app.use('/', routes);

storage.initialize( (error) => {

  if(error) {
      console.log(error);
      return;
  }

  var server = http.createServer(app);
  server.listen(3000, () => {
    console.log('Express server started');
  });

});
