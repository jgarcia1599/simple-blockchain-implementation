const db = require("./db");
const Block = require("./models/Block");


const TARGET_DIFFICULTY = BigInt("0x0" + "F".repeat(63));

let mining = false;
function mine() {
  if (!mining) return;
  let block = new Block ()
  while(BigInt('0x' + block.hash()) >= TARGET_DIFFICULTY){
      block.nonce++;
  }
  db.blockchain.addBlock(block);
  console.log(`Just mined block ${db.blockchain.blockHeight()} with a hash of ${block.hash()} at nonce ${block.nonce}`);
  setTimeout(mine, 500);
}

function stopMining() {
  mining = false;
}
function startMining() {
  mining = true;
  mine()
}
module.exports = {
  mine,
  startMining,
  stopMining,
};
