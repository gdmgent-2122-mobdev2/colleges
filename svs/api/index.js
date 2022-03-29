import "dotenv/config";

import express from "express";
import { ObjectId } from "mongodb";
import { initClient } from "./db/mongo.js";
import { registerMiddleware } from "./middleware/index.js";

const app = express();
const port = 3002;

// register middleware
registerMiddleware(app);

// init MongoDB
const client = await initClient();
const db = client.db();

app.post("/login", async (req, res) => {
  const username = req.body.username;

  let user = await db.collection("users").findOne({ username });

  if (!user) {
    await db.collection("users").insertOne({ username });
    user = await db.collection("users").findOne({ username });
  }

  res.json(user);
});

const authRouter = express.Router();

authRouter.get("/students", async (req, res) => {
  console.log(req.user);
  const students = await db.collection("students").find().toArray();
  res.json(students);
});

authRouter.post("/students", async (req, res) => {
  const student = {
    image:
      "https://arteveldehogeschool.instructure.com/images/messages/avatar-50.png",
    ...req.body,
  };

  await db.collection("students").insertOne(student);

  // return added student
  res.json(student);
});

authRouter.get("/students/:id", async (req, res) => {
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
authRouter.patch("/students/:id", async (req, res) => {
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
authRouter.delete("/students/:id", async (req, res) => {
  const id = req.params.id;

  await db.collection("students").deleteOne({
    _id: ObjectId(id),
  });

  res.json({});
});

app.use(async (req, res, next) => {
  if (req.headers.authorization) {
    // check if user with id exists
    const user = await db
      .collection("users")
      .findOne({ _id: ObjectId(req.headers.authorization) });
    // exists? pass user to request
    if (user) {
      req.user = user;
      return next();
    }
  }
  res.status(401).json({
    error: "Unauthorized",
  });
}, authRouter);

app.listen(port, () => {
  console.log(`App listening http://localhost:${port}`);
});

// make sure database is closed when server crashes
const closeServer = () => {
  // default
  process.exit();
};

process.on("SIGINT", () => closeServer());
process.on("SIGTERM", () => closeServer());
