var http = require('http');
var express = require('express');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// curl http://localhost:3000
app.get('/', (request, response) => {

  response.send('Hello World!');

});

// curl -H "Content-Type: application/json" -X PUT -d '{"username":"marco","password":"polo"}' http://localhost:3000
app.put('/', (request, response) => {

  console.log(request.body);
  response.send('Thanks, ' + request.body.username);

});

var server = http.createServer(app);
server.listen(3000, () => {
  console.log('Express server started');
});
