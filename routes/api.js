const express = require('express');
const router = express.Router();
const db = require('../dal/data');

let data = [
    { id: 1, title: 'Avengers', Genre: 'Action', Rating: '8', Director: 'Joss Whedon' }
];
//get all movies
router.get('/movies', async (req, res) => {
    try {
        const movies = await db.getAllMovies();
        res.json(movies);
    } catch (error) {
        console.error('Error loading movies!', error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/movies', (req, res) => {
    const newMovie = req.body;
    data.push(newMovie);
    res.status(201).json(newMovie);
});

module.exports = router;
