const shortId = require("shortid");
const IPFS_CLIENT = require("ipfs-http-client");
const pinataSDK = require("@pinata/sdk");

let ipfs = null;
let pinata = null;

(async () => {
  // set up a remote node connection  to pinata endpoint
  ipfs = await IPFS_CLIENT.create({
    host: process.env.PIN_ENDPOINT,
    port: 5001,
    protocol: "https",
  });

  pinata = pinataSDK(process.env.PIN_KEY, process.env.PIN_SECRET);
  console.log(pinata);
})();

const ErrorResponse = (errorData) => {
  const { res, status, statusCode, reason } = errorData;
  res.status(statusCode).json({ status, reason });
};

const routes = (app, db, lms, accounts) => {
  const userCollection = db.collection("music-users");
  const musicCollection = db.collection("music-store");

  // register user
  app.post("/register", (req, res) => {
    const email = req.body.email;
    const uniqueId = shortId.generate();
    if (email) {
      userCollection.findOne({ email }, (err, result) => {
        if (err) throw err;
        if (result) {
          ErrorResponse({
            res,
            status: "failed",
            statusCode: 400,
            reason: "Already Registered!",
          });
        } else {
          userCollection.insertOne({ email });
          res.status(200).json({ status: "registered", id: uniqueId });
        }
      });
    } else {
      ErrorResponse({
        res,
        status: "failed",
        statusCode: 400,
        reason: "Wrong input!",
      });
    }
  });

  // login user
  app.post("/login", (req, res) => {
    const email = req.body.email;
    if (email) {
      userCollection.findOne({ email }, (err, result) => {
        if (result) {
          res.status(200).json({ status: "logged in", id: res.id });
        } else {
          ErrorResponse({
            res,
            status: "failed",
            statusCode: 400,
            reason: "Not recognised!",
          });
        }
      });
    } else {
      ErrorResponse({
        res,
        status: "failed",
        statusCode: 400,
        reason: "Wrong input!",
      });
    }
  });

  // upload details
  app.put("/upload", async (req, res) => {
    const ID = shortId.generate() + shortId.generate() + shortId.generate();
    const musicInfo = { title: "", name: "" };
    let body = [];

    if (req.busboy) {
      req.busboy.on("file", async function (fieldname, file, filename) {
        if (fieldname && filename) {
          // readable stream
          file.on("data", function (data) {
            body.push(data);
          });

          file.on("end", async function () {
            body = Buffer.concat(body);
            // add file to ipfs
            let ipfsHash = await ipfs.add(body);
            // save ipfs hash into smartcontract
            await lms.sendIpfs(ID, ipfsHash.path, {
              from: accounts[0],
            });
            // populate DB with the ipfs data
            musicCollection.insertOne({
              ID,
              cid: ipfsHash.path,
              title: musicInfo.title,
              name: musicInfo.name,
            });
            // pin the hash into the pinata gateway
            const { authenticated } = await pinata.testAuthentication();
            if (authenticated) {
              await pinata.pinByHash(ipfsHash.path, {
                pinataMetadata: {
                  name: "Musix",
                  size: ipfsHash.size,
                },
              });

              res
                .status(200)
                .json({ status: "success", cid: ipfsHash.path, ID });
            }
          });
        } else {
          req.busboy.destroy();
          steamError = true;
          ErrorResponse({
            res,
            status: "failed",
            statusCode: 400,
            reason: "Sorry something happened!",
          });
        }
      });
      req.busboy.on("field", function (key, value) {
        if (key) {
          musicInfo[key] = value;
        } else {
          req.busboy.destroy();
          steamError = true;
          ErrorResponse({
            res,
            status: "failed",
            statusCode: 400,
            reason: "Sorry something happened!",
          });
        }
      });
      req.pipe(req.busboy);
    }
  });

  // fetch all the music corresponding to a user
  app.get("/access/:email", async (req, res) => {
    const { email } = req.params;
    if (email) {
      userCollection.findOne({ email }, async (err, response) => {
        if (response) {
          const data = await musicCollection.find().toArray();
          res.status(200).json({ status: "success", data });
        }
      });
    } else {
      ErrorResponse({
        res,
        status: "failed",
        statusCode: 400,
        reason: "Please add correct Inputs!",
      });
    }
  });

  // fetch a specific music collection
  app.get("/access/:email/:id", async (req, res) => {
    const { id, email } = req.params;
    if (id && email) {
      userCollection.findOne({ email }, async (err, response) => {
        if (response) {
          const hashValue = await lms.getHash.call(id);
          res.status(200).json({ status: "success", data: hashValue });
        } else {
          ErrorResponse({
            res,
            status: "failed",
            statusCode: 400,
            reason: "Wrong input!",
          });
        }
      });
    } else {
      ErrorResponse({
        res,
        status: "failed",
        statusCode: 400,
        reason: "Wrong input!",
      });
    }
  });
};

module.exports = { routes };
