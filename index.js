const jayson = require('jayson');
const {startMining,stopMining} = require('./mine');
const { PORT } = require('./config');




// create a server
const server = new jayson.Server({
  startMining: function(_, callback) {
    callback(null, 'success!');
    startMining()
  }, 
  stopMining: function(_, callback) {
    stopMining()
    callback(null, 'success!');
  }
});

server.http().listen(PORT);