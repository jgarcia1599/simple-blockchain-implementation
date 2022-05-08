const SHA256 = require("crypto-js/sha256");

class Block {
  constructor() {
    this.timestamp = Date.now();
    this.nonce = 0;
    // in BTC, we would put a merkel root here instead of a transactions array
    this.transactions = [];
  }
  addTransactions(transaction) {
    this.transactions.push(transaction);
  }

  hash() {
    return SHA256(
      this.timestamp + "" + this.nonce + "" + JSON.stringify(this.transactions)
    ).toString();
  }

  execute() {
    this.transactions.forEach((transaction) => transaction.execute());
  }
}
module.exports = Block;
