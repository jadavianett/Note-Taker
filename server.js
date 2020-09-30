const { notStrictEqual } = require("assert");
const express = require("express");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 3000;

//middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// NOTES 
var notes = [];



// HTML ROUTES 

// get /notes 
// should return the notes.html file
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

// get * 
// should return the index.html file
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"))
});


//API ROUTES

// get /api/notes
// should read the db.json file 
// return all saved notes as JSON 
app.get("/api/notes", function (req, res) {
    return res.json(notes);
});

//post /api/notes 
// should receive a new note to save on the request body
// add it to the db.json file
// return the new note to the client 

// delete /api/notes/:id
// should receive a query param containing the id of a note to delete 
    // this means you'll need to find a way to give each note a unique id when its saved
// read all notes from the db.json file, remove the note with the given 'id' property, and rewrite the notes to the db.json file







//starts the server listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });