const IPFS_INBOX = artifacts.require("Inbox");

module.exports = function (deployer) {
  deployer.deploy(IPFS_INBOX);
};
