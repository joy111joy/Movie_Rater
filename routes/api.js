const express = require('express');
const router = express.Router();

let data = [
    { id: 1, title: 'Avengers', Genre: 'Action', Rating: '8', Director: 'Joss Whedon' }
];

router.get('/movies', (req, res) => {
    res.json(data);
});

router.post('/movies', (req, res) => {
    const newMovie = req.body;
    data.push(newMovie);
    res.status(201).json(newMovie);
});