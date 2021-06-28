require("dotenv").config();
const express = require("express");

// const Web3 = require("web3");
const { MongoClient } = require("mongodb");
// const contract = require("@truffle/contract");
const { routes } = require("./routes");
const dicer = require("./dicer");
// const artifacts = require("../build/contracts/Inbox.json");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for form-data
app.use(
  dicer({
    highWaterMark: 2 * 1024 * 1024,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  })
);

// let web3;

// if (typeof web3 !== "undefined") {
//   web3 = new Web3(web3.currentProvider);
// } else {
//   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// }

// get the contractABI and feed it to truffle contract for better abstraction
// const LMS = contract(artifacts);
// LMS.setProvider(web3.currentProvider);

// connect to the server
MongoClient.connect(
  process.env.DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  async (err, client) => {
    if (err) throw err;
    console.log("connected successfully to database!");
    const db = client.db("Cluster0");
    // const accounts = await web3.eth.getAccounts(); /////
    // instance of deployed contract
    // const lms = await LMS.deployed(); ////
    // fill up routes
    routes(app, db);
  }
);

const PORT = process.env.PORT || 8082;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`listening on port ${PORT}`);
});
