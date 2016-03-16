var storageAccount = '...';
var storageAccessKey = '...';

var http = require('http');
var express = require('express');
var azure = require('azure-storage');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var tableSvc = azure.createTableService(storageAccount, storageAccessKey);

// curl http://localhost:3000
app.get('/', (request, response) => {

  response.send('Hello World!');

});

// curl -H "Content-Type: application/json" -X PUT -d '{"username":"marco","password":"polo"}' http://localhost:3000
app.put('/', (request, response) => {

  console.log(request.body);
  response.send('Thanks, ' + request.body.username);

  var task = {
    PartitionKey: {'_': '1'},
    RowKey: {'_': request.body.username},
    password: {'_': request.body.password}
  };

  tableSvc.insertEntity('passwords', task, function (error, result, response) {

    if (error) {
      console.log(error);
      return;
    }

  });
});

tableSvc.createTableIfNotExists('passwords', function(error, result, response) {

  if (error) {
    console.log(error);
    return;
  }

  var server = http.createServer(app);
  server.listen(3000, () => {
    console.log('Express server started');
  });

});
