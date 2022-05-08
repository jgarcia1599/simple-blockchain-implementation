const EC = require("elliptic").ec;

const ec = new EC("secp256k1");

const key = ec.genKeyPair();

console.log({
  privateKey: key.getPrivate().toString(16),
  // for us, the public key will be the actual address. But BTC
  //and ETH generates the public address from the public key using some hashing algorithm magic
  publicX: key.getPublic().encode("hex"),
});
