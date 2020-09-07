const express = require("express");
const app = express();
const cors = require("cors");
// const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const { send } = require("process");

app.use(cors());

app.use(express.json());

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "lesbonsartisans";

// Create a new MongoClient
const client = new MongoClient(url);

app.get("/products", (req, res) => {
  client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection("lba");
    collection.find({}).toArray(function (err, docs) {
      res.send(docs);
    });
  });
});

app.get("/products/:id", (req, res) => {
  client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection("lba");
    collection
      .find({ _id: parseInt(req.params.id) })
      .toArray(function (err, docs) {
        res.send(docs);
      });
  });
});

app.post("/products", (req, res) => {
  const product = {
    name: req.body.name,
    type: req.body.type,
    price: req.body.price,
    rating: req.body.rating,
    warranty_years: req.body.warranty_years,
    available: req.body.available,
  };

  client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection("lba");
    collection.insertOne(product, function (err, docs) {
      res.send(docs);
    });
  });
});

app.put("/products", (req, res) => {
  console.log(req.body);
  const product = {
    name: req.body.name,
    type: req.body.type,
    price: req.body.price,
    rating: req.body.rating,
    warranty_years: req.body.warranty_years,
    available: req.body.available,
  };

  client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection("lba");
    collection.updateOne({ name }, { $set: { product } }, function (err, docs) {
      res.send(docs);
    });
  });
});

app.delete("/products/:id", (req, res) => {
  client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection("lba");
    collection.deleteOne({ _id: parseInt(req.params.id) }, function (
      err,
      docs
    ) {
      res.send(docs);
    });
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
