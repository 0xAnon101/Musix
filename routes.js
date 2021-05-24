const shortId = require("shortid");
const IPFS_CLIENT = require("ipfs-http-client");

// set up a remote node connection
const ipfs = IPFS_CLIENT.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const routes = (app, db, lms, accounts) => {
  const userCollection = db.collection("music-users");
  const musicCollection = db.collection("music-store");

  // register user
  app.post("/register", (req, res) => {
    const email = req.body.email;
    const uniqueId = shortId.generate();
    if (email) {
      db.collection("music").findOne({ email }, (err, result) => {
        if (err) throw err;
        if (result) {
          res
            .status(400)
            .json({ status: "failed", reason: "Already Registered!" });
        } else {
          db.collection("music").insertOne({ email });
          res.status(200).json({ status: "success", id: uniqueId });
        }
      });
    } else {
      res.status(400).json({ status: "failed", reason: "Wrong input!" });
    }
  });

  // login user
  app.post("/login", (req, res) => {
    const email = req.body.email;
    if (email) {
      db.collection("music").findOne({ email }, (err, result) => {
        if (result) {
          res.status(200).json({ status: "success", id: res.id });
        } else {
          res.status(400).json({ status: "Failed", reason: "Not recognised" });
        }
      });
    } else {
      res.status(400).json({ status: "failed", reason: "Wrong input!" });
    }
  });

  // upload details
  app.put("/upload", async (req, res) => {
    const ID = shortId.generate() + shortId.generate() + shortId.generate();
    if (req.busboy && title) {
      req.busboy.on(
        "file",
        function (fieldname, file, filename, encoding, mimetype) {
          console.log(fieldname, file);
        }
      );
      req.busboy.on(
        "field",
        function (key, value, keyTruncated, valueTruncated) {
          console.log(key, value);
        }
      );
      req.pipe(req.busboy);
    } else {
      res.status(400).json({ status: "Failed", reason: "wrong input" });
    }
  });

  // access data
  app.get("/access/:email/:id", (req, res) => {
    if (req.params.id && req.params.email) {
    } else {
      res.status(400).json({ status: "Failed", reason: "wrong input" });
    }
  });
};

module.exports = { routes };
