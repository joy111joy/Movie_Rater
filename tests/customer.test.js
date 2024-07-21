const request = require('supertest');
const app = require('../app'); // Adjust the path as necessary


describe('Customer views all movies', () => {
  it('should display a web page listing all movies', async () => {
    const response = await request(app).get('/'); // Adjust the route if necessary

    expect(response.status).toBe(200);
    expect(response.text).toContain('<html'); // Check for HTML content
    expect(response.text).toContain('Hunger Games'); // Example content check
    expect(response.text).toContain('Madame Web'); // Example content check
    // Add more specific checks for content as needed
  });
});

