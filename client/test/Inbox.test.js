const Inbox = artifacts.require("Inbox");
const chai = require("chai");
const shortId = require("shortid");
const chaiAsPromised = require("chai-as-promised");
const truffleAssert = require("truffle-assertions");

const assert = chai.assert;
chai.use(chaiAsPromised);

// init values
let inbox = null;
const hashValue = shortId.generate();

contract("Inbox", (accounts) => {
  beforeEach("get the deployed instance", async () => {
    inbox = await Inbox.deployed();
  });

  // Test 1
  it("should send hashValue to onchain", async () => {
    const result = await inbox.sendIpfs(accounts[0], hashValue, {
      from: accounts[0],
    });
    truffleAssert.eventEmitted(result, "IpfsSent", (ev) => {
      return ev._hashValue == hashValue && ev._address == accounts[0];
    });
  });

  // Test 2
  it("should get the hashValue tied to account", async () => {
    const result = await inbox.sendIpfs(accounts[1], hashValue, {
      from: accounts[1],
    });

    truffleAssert.eventEmitted(result, "IpfsSent", (ev) => {
      console.log(ev._hashValue, ev._address);
      return ev._hashValue == hashValue && ev._address == accounts[1];
    });

    const hashResult = await inbox.getHash.call(accounts[1]);
    assert.equal(hashResult, hashValue);
  });
});
