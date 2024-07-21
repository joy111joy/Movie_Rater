// tests/business-partner.test.js

const request = require('supertest');
const app = require('../app');


describe('Business partner fetches all movies', () => {
  it('should return all movies as JSON', async () => {
    const response = await request(app).get('/api/movies'); // Assuming the API endpoint is /api/movies
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

