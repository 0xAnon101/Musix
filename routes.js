const shortId = require("shortid");

const routes = (app, db) => {
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
  app.put("/upload", (req, res) => {
    const { bufferData, name, title } = req.body;
    if (buffer && title) {
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
