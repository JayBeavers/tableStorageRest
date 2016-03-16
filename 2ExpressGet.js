var http = require('http');
var express = require('express');

var app = express();

// curl http://localhost:3000
app.get('/', (request, response) => {

  response.send('Hello World!');

});

var server = http.createServer(app);
server.listen(3000, () => {
  console.log('Express server started');
});
