const { Pool } = require('pg');

// Configure the PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'MovieRater',
  password: 'Jenjoyous1',
  port: 5432,
});


async function getAllMovies() {
  const results = await pool.query('SELECT * FROM movie');
  return results.rows;
}

async function getMovieById(id) {
  const results = await pool.query('SELECT * FROM movie WHERE id = $1', [id]);
  return results.rows[0];
}

async function createMovie(title, genre, rating, director) {
  const results = await pool.query('INSERT INTO movie(title, genre, rating, director) VALUES($1, $2, $3, $4) RETURNING *', [title, genre, rating, director]);
  return results.rows;
}

async function deleteMovie(id) {
  const results = await pool.query('DELETE FROM movie WHERE id = $1', [id]);
  return results.rows;
}

async function updateMovie(id, title, genre, rating, director) {
  const query = 'UPDATE movie SET title = $1, genre = $2, rating = $3, director = $4 WHERE id = $5 RETURNING *';
  const { rows } = await pool.query(query, [title, genre, rating, director, id]);
  return rows[0];
}


module.exports = {
  getAllMovies,
  createMovie,
  deleteMovie,
  getMovieById,
  updateMovie
};