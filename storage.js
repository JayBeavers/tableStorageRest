var storageAccount = '...';
var storageAccessKey = '...';

var azure = require('azure-storage');

module.exports = () => {

  var tableSvc = azure.createTableService(storageAccount, storageAccessKey);

  return {

    initialize: (callback) => {

      tableSvc.createTableIfNotExists('passwords', function(error, result, response) {

        if (error) {
          callback(error);
          return;
        }

        callback();

      });
    },

    insert: (table, entity, callback) => {
      tableSvc.insertEntity(table, entity, callback);
    }

  };

}
