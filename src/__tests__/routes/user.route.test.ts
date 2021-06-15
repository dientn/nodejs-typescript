import request from 'supertest';
import app from '../../server/server';
import connectDb from '../../server/database';
// import User from '../../server/models/user';

import mongoose from 'mongoose';

// // May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
const mongooseOpts = {
    // options for mongoose 4.11.3 and above
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true,
    reconnectInterval: 1000,
    useFindAndModify:true,
    useUnifiedTopology: true
  };
beforeAll(async () => {
  await connectDb(mongooseOpts);
  // await mongoose.model("User").deleteMany();
  // Seed data for test if we need

});

afterAll(async () => {
  // Clear the tested and seeded data
  // await User.deleteMany(err =>{
  //   console.error(err);
  // });
  // Drop collection for this test and related
  // await mongoose.connection.db.dropCollection('users');
  await mongoose.disconnect()
});

describe('Users Endpoints', () => {
  let userId: string | null = null;
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        email: 'bill@microsoft.com',
        firstName: 'Bill',
        lastName: 'Gates'
      });
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('user');
    userId = res.body.user._id;
  });

  it('should fetch a single user', async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('user');
  });

  it('should fetch all user', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('users');
    expect(res.body.users).toHaveLength(1);
  });

  it('should update a user', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({
        firstName: 'updated firstName',
        lastName: 'updated lastName',
      });

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('firstName', 'updated firstName');
  });

  // it('should update a user return status code 500 if id incorrect ', async () => {
  //   const res = await request(app)
  //     .put(`/api/users/212121212`)
  //     .send({
  //       firstName: 'updated firstName',
  //       lastName: 'updated lastName',
  //     });

  //   expect(res.status).toEqual(500);
  //   expect(res.body).toHaveProperty('error');
  //   console.log(res.body)
  // });

  it('should return status code 404 if email existed', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        email: 'bill@microsoft.com',
        firstName: 'Bill',
        lastName: 'Gates'
      });
    expect(res.status).toEqual(500);
    expect(res.body).toHaveProperty('error');
  });

  it('should delete a user', async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.status).toEqual(204);
  });

  it('should respond with status code 404 if resource is not found', async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.status).toEqual(404);
  });
});
