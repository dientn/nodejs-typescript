import request from 'supertest'
import app from '../../server/server'

describe('Health check endpoints', () => {
  it('Should return OK', async () => {
    const res = await request(app).get(`/api/health-check`);
      
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(`OK`);
  });
})

describe('Home endpoints', () => {
    it('Should return 200', async () => {
      const res = await request(app).get(`/api`);
        
      expect(res.status).toEqual(200);
      expect(res.body).toEqual(`Welcome`);
    });
});