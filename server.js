require("dotenv").config();
const express = require("express");

const Web3 = require("web3");
const { MongoClient } = require("mongodb");
const contract = require("@truffle/contract");
const { routes } = require("./routes");

const app = express();
app.use(express.json());

// connect to the server
MongoClient.connect(
  process.env.DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err;
    console.log("connected successfully to database!");
    const db = client.db("Cluster0");
    routes(app, db);
  }
);

const PORT = process.env.PORT || 8082;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`listening on port ${PORT}`);
});
