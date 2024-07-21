// tests/staff.test.js

const request = require('supertest');
const app = require('../app');


//test to check if staff can add a new movie
describe('Staff adds a new movie', () => {
  it('should display a form to add a new movie', async () => {
    const response = await request(app).get('/new');
    expect(response.status).toBe(200);
    expect(response.text).toContain('<form'); // Check for form in HTML content
  });

  it('should add a new movie to the database', async () => {
    const newMovie = {
      title: 'New Movie',
      genre: 'Action',
      rating: 8,
      director: 'Director Name'
    };

    const response = await request(app).post('/movies').send(newMovie);
    expect(response.status).toBe(302); // Assuming redirection after successful creation
    expect(response.headers.location).toBe('/');
  });
});

//test to check if staff can edit a movie
describe('Staff edits a movie', () => {
  it('should display a form to edit a movie', async () => {
    const response = await request(app).get('/movies/18/edit'); // Assuming movie ID is 1
    expect(response.status).toBe(200);
    expect(response.text).toContain('<form'); // Check for form in HTML content
  });

  it('should update the movie in the database', async () => {
    const updatedMovie = {
      title: 'Updated Movie',
      genre: 'Action',
      rating: 9,
      director: 'New Director Name'
    };

    const response = await request(app).patch('/movies/1').send(updatedMovie); // Assuming movie ID is 1
    expect(response.status).toBe(302); // Assuming redirection after successful update
    expect(response.headers.location).toBe('/');
  });
});

//test to check if staff can delete a movie
describe('Staff deletes a movie', () => {
  it('should delete the movie from the database', async () => {
    const response = await request(app).delete('/movies/1'); // Assuming movie ID is 1
    expect(response.status).toBe(302); // Assuming redirection after successful deletion
    expect(response.headers.location).toBe('/');
  });
});