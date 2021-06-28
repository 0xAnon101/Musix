const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic =
  "immense modify expire tunnel legend hurt buzz brisk name client wheat attitude";

module.exports = {
  contracts_directory: "./contracts",
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 9545, // Standard Ethereum port (default: none)
      network_id: "1337", // Any network (default: none)
    },
    ganache: {
      provider: function () {
        return new HDWalletProvider(mnemonic, "http://127.0.0.1:8545/");
      },
      network_id: "1337",
    },
  },
  compilers: {
    solc: {
      version: "0.7.0", // Fetch exact version from solc-bin (default: truffle's version)
      docker: false, // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200,
        },
        evmVersion: "byzantium",
      },
    },
  },
  db: {
    enabled: false,
  },
};
