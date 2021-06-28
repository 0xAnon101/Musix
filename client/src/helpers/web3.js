import Web3 from "web3";

export const Web3 = () =>
  new Promise((resolve, reject) => {
    let web3;

    if (window.ethereum) {
      // Modern DApp browsers
      web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        res;
      } catch (error) {
        // User denied account access
        console.log(error);
      }
    } else if (window.web3) {
      // Legacy dapp browsers
      web3 = new Web3(window.web3.currentProvider);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
  });
