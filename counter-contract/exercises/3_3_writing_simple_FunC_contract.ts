const { Address } = require("ton-core");

const rawAddress =
  "a3935861f79daf59a13d6d182e1640210c02f98e3df18fda74b8f5ab141abf18";
const workchain = 0;

const hashBuffer = Buffer.from(rawAddress, "hex");

const address = new Address(workchain, hashBuffer);

console.log(address);
