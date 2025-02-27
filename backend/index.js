const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "taskmanagement",
});

app.get("/task", (req, res) => {
  const q = "SELECT * FROM task";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});

// SORT
app.get("/", (req, res) => {
  const { q } = req.query;
  const keys = ["name", "description"];

  const search = (data) => {
    return data.filter((task) =>
      keys.some((key) => item[key].toLowerCase().include(q))
    );
  };
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const dueDate = req.body.dueDate;
  const isCompleted = req.body.isCompleted;

  db.query(
    "INSERT INTO task (name, description, dueDate, isCompleted) VALUES (?,?,?,?)",
    [name, description, dueDate, isCompleted],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("You have added a task successfully.");
      }
    }
  );
});

app.delete("/task/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM task WHERE id=?";
  const values = [id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Task removed!");
    }
  });
});

app.put("/task/:id", (req, res) => {
  const id = req.params.id;
  console.log("req.body ==========", req.body);
  const sql =
    "UPDATE task SET `name`=?, `description`=?, `dueDate`=? WHERE id=?";
  const values = [req.body.name, req.body.description, req.body.dueDate, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Task removed!");
    }
  });
});

app.listen(8001, () => {
  console.log(`Server is running!`);
});
