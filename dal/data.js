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

async function createMovie(title, genre, rating, director) {
  const results = await pool.query('INSERT INTO movie(title, genre, rating, director) VALUES($1, $2, $3, $4) RETURNING *', [title, genre, rating, director]);
  return results.rows;
}

async function deleteMovie(id) {
  const results = await pool.query('DELETE FROM movie WHERE id = $1', [id]);
  return results.rows;
}

module.exports = {
  getAllMovies,
  createMovie,
  deleteMovie,
};