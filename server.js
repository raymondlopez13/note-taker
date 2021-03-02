const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
let notes = require("./Develop/db/db.json");
const fs = require('fs');
const { validateNote, writeToFile, deleteFile, findNote } = require('./Develop/lib/notes');
app.use(express.static('Develop/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const path = require('path');

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});
app.post('/api/notes', (req, res) => {
    let result = validateNote(req.body);
    if(result) {
        const newNote = req.body;
        writeToFile(newNote);
        res.json(newNote);
    } else {
        res.status(400).send('Please add either a title or text to your note!');
    }
});

app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id;
    let note = findNote(id);
    let result = deleteFile(note[0]);
    notes = result;
    res.json(result);
});
app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
});
app.get('/api/notes/:id', (req, res) => {
    let id = req.params.id;
    let result = findNote(id);
    res.json(result);
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});