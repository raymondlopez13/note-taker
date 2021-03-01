const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const [ notes ] = require("./Develop/db/db.json");
app.use(express.static('Develop/public'));
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
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});