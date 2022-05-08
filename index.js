const jayson = require("jayson");
const { startMining, stopMining } = require("./mine");
const { PORT } = require("./config");
const { utxos } = require("./db");

// create a server
const server = new jayson.Server({
  startMining: function (_, callback) {
    callback(null, "success!");
    startMining();
  },
  stopMining: function (_, callback) {
    stopMining();
  },
  getBalance: function (args, callback) {
    const address = args.PUBLIC_KEY;
    const addressUTXOS = utxos.filter((utxo) => {
      return utxo.owner === address && !utxo.spent;
    });
    const balance = addressUTXOS.reduce((balance, utxo) => {
      return (balance += utxo.amount);
    }, 0);
    callback(null, balance);
  },
});

server.http().listen(PORT);
