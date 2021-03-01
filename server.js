const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const [ notes ] = require("./Develop/db/db.json");

app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});
