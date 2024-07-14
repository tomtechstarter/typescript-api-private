import request from 'supertest';
import server from '../src/server';

describe('GET /', () => {
  it('should return Hello, World!', async () => {
    const response = await request(server).get('/v1/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, World!');
  });
});
