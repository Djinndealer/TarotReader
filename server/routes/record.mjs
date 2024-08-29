import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
// Express application that builds a path using Router()
// Router() is an object using different methods for response and request
const router = express.Router();

// This section will help you get a list of all the records.
// Method .get() handles the Express application information
// In this instance router receives the database results and responds okay
router.get("/", async (req, res) => {
  let collection = await db.collection("records");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
// The id is requested through router to get from database
// If the id is not found then the router responds not found
// Else when the id is found the router responds with the result and "okay"
router.get("/:id", async (req, res) => {
  let collection = await db.collection("records");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
// The routers post method accepts newDocument object with name, position, and level properties
// The router awaits the databases collection, named "records," and inserts the document
// The result sent as a response to our server
router.post("/", async (req, res) => {
  let newDocument = {
    question: req.body.question
  };
  let collection = await db.collection("records");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a record by id.
// Server takes the id and and creates a new object to search database
// When document is found the request to the server is placed in the update parameters
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      question: req.body.question
    }
  };

  let collection = await db.collection("records");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("records");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;