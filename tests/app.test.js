const request = require('supertest');
const app = require('../app.js');

describe('The Express Server', () => {
  test('GET / should return 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  test('GET /products should return 200', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
  });

  test('GET /orders should return 200', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toBe(200);
  });
});