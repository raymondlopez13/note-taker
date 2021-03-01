const fs = require('fs');
const path = require('path');
const notes = require('../db/db.json');
const { nanoid } = require('nanoid');

function validateNote(note) {
    if (note.title === '' || !note.title) {
        return false;
    } 
    if (note.text === '' || !note.text) {
        return false;
    }
    return true;
}

function writeToFile(note) {
    const newNote = note;
    newNote.id = nanoid();
    notes.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notes, null, 2)
    );
}

module.exports = {
    validateNote,
    writeToFile
}