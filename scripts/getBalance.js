const config = require("./../config");
const client = require("./client");

client.request(
  "getBalance",
  { PUBLIC_KEY: config.PUBLIC_KEY },
  function (err, response) {
    console.log({ PUBLIC_KEY: config.PUBLIC_KEY });
    if (err) throw err;
    console.log(" balance!!!", response.result); // success!
  }
);
