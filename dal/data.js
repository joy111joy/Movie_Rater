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
  const results = await pool.query('SELECT * FROM movies');
  return results.rows;
}

async function createMovie(title, description, genre, rating) {
  const results = await pool.query('INSERT INTO movies(title, description, genre, rating) VALUES($1, $2, $3, $4) RETURNING *', [title, description, genre, rating]);
  return results.rows;
}

async function deleteMovie(id) {
  const results = await pool.query('DELETE FROM movies WHERE id = $1', [id]);
  return results.rows;
}

