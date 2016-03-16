var storageAccount = '...';
var storageAccessKey = '...';

var azure = require('azure-storage');
var tableSvc = azure.createTableService(storageAccount, storageAccessKey);

tableSvc.createTableIfNotExists('tasks', function(error, result, response) {

  if(error) {
      console.log(error);
      return;
  }

  var task = {
    PartitionKey: {'_': 'hometasks'},
    RowKey: {'_': '1'},
    description: {'_': 'take out the trash'},
    dueDate: {'_': new Date(2015, 6, 20), '$':'Edm.DateTime'}
  };

  tableSvc.insertEntity('tasks', task, function (error, result, response) {

      if (error) {
          console.log(error);
          return;
      }

      console.log('written!');

  });

});
