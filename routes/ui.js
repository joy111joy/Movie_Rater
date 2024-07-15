const express = require('express');
const router = express.Router();
const { getAllMovies, createMovie, deleteMovie, getMovieById, updateMovie } = require('../dal/data');

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

// Route to display the edit form
router.get('/movies/:id/edit', async (req, res) => {
  const movieId = req.params.id;
  try {
    const movie = await getMovieById(movieId);
    if (!movie) {
      return res.status(404).send('Movie not found');
    }
    res.render('edit', { movie });
  } catch (err) {
    console.error('Error fetching movie:', err);
    res.status(500).send('Error fetching movie');
  }
});

// Route to handle updating the movie using PATCH method
router.patch('/movies/:id', async (req, res) => {
  const movieId = req.params.id;
  const { title, genre, rating, director } = req.body;
  try {
    await updateMovie(movieId, title, genre, rating, director);
    res.redirect('/');
  } catch (err) {
    console.error('Error updating movie:', err);
    res.status(500).send('Error updating movie');
  }
});

// Route to handle deleting the movie
router.delete('/movies/:id', async (req, res) => {
  const movieId = req.params.id;
  try {
    await deleteMovie(movieId);
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
