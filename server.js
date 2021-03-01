const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const notes = require("./Develop/db/db.json");
const fs = require('fs');
const { validateNote, writeToFile } = require('./Develop/lib/notes');
app.use(express.static('Develop/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const path = require('path');



app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});
app.post('/api/notes', (req, res) => {
    const result = validateNote(req.body);
    if(result) {
        const newNote = req.body;
        writeToFile(newNote);
        res.json(newNote);
    } else {
        res.status(400).send('Please add either a title or text to your note!');
    }
})
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});