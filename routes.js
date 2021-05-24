const shortId = require("shortid");
const IPFS_CLIENT = require("ipfs-http-client");

// set up a remote node connection
const ipfs = IPFS_CLIENT.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

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
          db.collection("music").insertOne({ email });
          res.status(200).json({ status: "success", id: uniqueId });
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
          res.status(200).json({ status: "success", id: res.id });
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
    let steamError = false;
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
            // successfully added
            let ipfsHash = await ipfs.add(body);
            const response = await lms.sendIpfs(ID, ipfsHash.path, {
              from: accounts[0],
            });

            musicCollection.insertOne({
              ID,
              cid: ipfsHash.path,
              title: musicInfo.title,
              name: musicInfo.name,
            });
            res.status(200).json({ status: "success", cid: ipfsHash.path, ID });
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

  // access data
  app.get("/access/:email/:id", (req, res) => {
    if (req.params.id && req.params.email) {
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
