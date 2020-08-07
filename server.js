const express = require("express");
const path = require("path");
var fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const notes = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes", (req, res) => {
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if(err) throw err;
    const savedNote = JSON.stringify(data);
    console.log(savedNote)
  });
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  notes.push(newNote);
  const data = JSON.stringify(notes)
  fs.writeFile("db/db.json", data, (err) => {
    if(err) throw err;
    // console.log(data)
  })
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });