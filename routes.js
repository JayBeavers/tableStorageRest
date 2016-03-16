var router = require('express').Router();

module.exports = (insert) => {

  router.get('/', (request, response) => {
    response.send('Hello World!');
  });

  router.put('/', (request, response) => {

    var task = {
      PartitionKey: {'_': '1'},
      RowKey: {'_': request.body.username},
      password: {'_': request.body.password}
    };

    insert('passwords', task, function (error, result, response2) {

      if (error) {
        console.log(error);
        response.status(500).send(error);
        return;
      }

      response.status(200).send('Thanks, ' + request.body.username);

    });
  });

  return router;

};
