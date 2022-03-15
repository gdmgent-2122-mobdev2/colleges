import express from "express";
import cors from "cors";
import { readFileSync, writeFileSync } from "fs";
import bodyParser from "body-parser";

const DATA_PATH = "./data/students.json";

const app = express();
const port = 3002;

// use CORS middleware
app.use(cors());
app.use(bodyParser.json());

const getStudentsFromFile = () => {
  const data = readFileSync(DATA_PATH, "utf8");
  return JSON.parse(data);
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/students", (req, res) => {
  const students = getStudentsFromFile();
  res.json(students);
});

app.post("/students", (req, res) => {
  const students = getStudentsFromFile();

  // map to array of id's + get highest (max)
  const highestId = Math.max(...students.map((student) => student.id));

  // add student
  const student = {
    id: highestId + 1,
    image:
      "https://arteveldehogeschool.instructure.com/images/messages/avatar-50.png",
    ...req.body,
  };
  students.push(student);

  // save changes to JSON file
  writeFileSync(DATA_PATH, JSON.stringify(students));

  // return added student
  res.json(student);
});

app.get("/students/:id", (req, res) => {
  const students = getStudentsFromFile();

  // get id from url + parseInt because student.id is a number
  const id = parseInt(req.params.id);
  const student = students.find((student) => student.id === id);

  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

app.listen(port, () => {
  console.log(`App listening http://localhost:${port}`);
});
