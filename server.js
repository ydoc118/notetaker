const express = require("express");
const path = require("path");
var fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

let notes = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.delete("/api/notes/:id", (req, res) => {
  const chosenNote = req.params.id;
  notes = notes.filter(notes => notes['id'] !== chosenNote)
  fs.writeFile("db/db.json", JSON.stringify(notes), (err) => {
    if(err) throw err;
    res.json(notes);
  })
 
})

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  notes.push(newNote);
  const data = JSON.stringify(notes)
  fs.writeFile("db/db.json", data, (err) => {
    if(err) throw err;
    res.json(data);
  })
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });