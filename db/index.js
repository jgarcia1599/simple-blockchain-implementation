const BlockChain = require("./../models/Blockchain");
const db = {
  blockchain: new BlockChain(),
  utxos: [],
};
module.exports = db;
