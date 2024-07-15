const express = require('express');
const router = express.Router();
const { getAllMovies, createMovie, deleteMovie } = require('../dal/data');

// Route to display the list of movies
router.get('/', async (req, res) => {
  try {
    const movies = await getAllMovies();
    res.render('index', { movies });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to display the form
router.get('/new', (req, res) => {
  res.render('new');
});

// Route to handle form submission
router.post('/movies', async (req, res) => {
  console.log('Request Body:', req.body); // Debug log
  const { title, genre, rating, director } = req.body;
  try {
    await createMovie(title, genre, rating, director);
    res.redirect('/');
  } catch (error) {
    console.error('Error creating movie:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Other routes...

module.exports = router;
