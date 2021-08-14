const path = require('path');
const fs = require('fs');
const express = require('express');
const database = require('./db/db.json');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/api/notes', (req, res) => {
    res.json(database);
});

app.post('/api/notes', (req, res) => {

    database.push(req.body);
    database.forEach((obj, i) => {
        obj.id = i + 1;
    });

    fs.writeFile('./db/db.json', JSON.stringify(database), () => {
        res.json(database);
    });
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT} 🚀`)
});