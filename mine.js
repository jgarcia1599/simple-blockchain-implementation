const db = require("./db");
const Block = require("./models/Block");
const Transaction = require("./models/Transaction");
const UTXO = require("./models/UTXO");
const { PUBLIC_KEY } = require("./config");

const TARGET_DIFFICULTY = BigInt("0x0" + "F".repeat(63));
const BLOCK_REWARD = 10;

let mining = true;
mine();
function mine() {
  if (!mining) return;
  let block = new Block();

  // TODO: add transactions from the meme pool
  let coinbaseUTXO = new UTXO(PUBLIC_KEY, BLOCK_REWARD);
  let coinbaseTransaction = new Transaction([], [coinbaseUTXO]);
  block.addTransactions(coinbaseTransaction);

  while (BigInt("0x" + block.hash()) >= TARGET_DIFFICULTY) {
    block.nonce++;
  }

  block.execute();
  db.blockchain.addBlock(block);
  console.log(
    `Just mined block ${db.blockchain.blockHeight()} with a hash of ${block.hash()} at nonce ${
      block.nonce
    }`
  );
  setTimeout(mine, 2000);
}

function stopMining() {
  mining = false;
}
function startMining() {
  mining = true;
  mine();
}
module.exports = {
  mine,
  startMining,
  stopMining,
};
