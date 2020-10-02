const express = require("express");
const path = require("path");
let db = require("./db/db.json");
const fs = require("fs");

let newId = 1;

const app = express();
const PORT = process.env.PORT || 3000;

//middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HTML ROUTES

// get /notes
// should return the notes.html file
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// get *
// should return the index.html file
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//API ROUTES

// get /api/notes
app.get("/api/notes", function (req, res) {
  res.json(db);
});

//post /api/notes

app.post("/api/notes", function (req, res) {
  try {
      const newNotes = req.body;
      for (i = 0; i < db.length; i++) {
          newId++;
      }
      newNotes.id = newId;
    db.push(req.body);
    fs.writeFile(
      path.join(__dirname, "./db/db.json"),
      JSON.stringify(db),
      function (err) {
        if (err) throw err;
      }
    );
    res.json(req.body);
  } catch (err) {
    throw err;
  }
});

// delete /api/notes/:id

app.delete("/api/notes/:id", function (req, res) {
    try {
      db = db.filter((note) => note.id != req.params.id);
      res.json({message: "your note was deleted"});
    } catch (err) {
      throw err;
    }
  });


//starts the server listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
