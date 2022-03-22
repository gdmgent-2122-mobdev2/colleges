import { ObjectID } from "bson";
import "dotenv/config";

import express from "express";
import { cp, readFileSync, writeFileSync } from "fs";
import { ObjectId } from "mongodb";
import { initClient } from "./db/mongo.js";
import { registerMiddleware } from "./middleware/index.js";

const DATA_PATH = "./data/students.json";

const app = express();
const port = 3002;

// register middleware
registerMiddleware(app);

// init MongoDB
const client = await initClient();
const db = client.db();

const getStudentsFromFile = () => {
  const data = readFileSync(DATA_PATH, "utf8");
  return JSON.parse(data);
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/students", async (req, res) => {
  const students = await db.collection("students").find().toArray();
  res.json(students);
});

app.post("/students", async (req, res) => {
  const student = {
    image:
      "https://arteveldehogeschool.instructure.com/images/messages/avatar-50.png",
    ...req.body,
  };

  await db.collection("students").insertOne(student);

  // return added student
  res.json(student);
});

app.get("/students/:id", async (req, res) => {
  const id = req.params.id;
  const student = await db.collection("students").findOne({
    _id: ObjectId(id),
  });

  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

// PATCH
app.patch("/students/:id", async (req, res) => {
  const id = req.params.id;

  const student = await db
    .collection("students")
    .findOne({ _id: ObjectId(id) });

  if (student) {
    const { _id, ...data } = req.body;
    const newData = { ...student, ...data };
    // or updateOne
    await db.collection("students").replaceOne({ _id: ObjectId(id) }, newData);

    res.json(newData);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

// DELETE
app.delete("/students/:id", async (req, res) => {
  const id = req.params.id;

  await db.collection("students").deleteOne({
    _id: ObjectID(id),
  });

  res.json({});
});

app.listen(port, () => {
  console.log(`App listening http://localhost:${port}`);
});

// make sure database is closed when server crashes
const closeServer = () => {
  // todo close db
  db.close();
  // default
  process.exit();
};

process.on("SIGINT", () => closeServer());
process.on("SIGTERM", () => closeServer());
