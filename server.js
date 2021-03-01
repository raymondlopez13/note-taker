const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const [ notes ] = require("./Develop/db/db.json");
app.use(express.static('public'));
const path = require('path');

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});