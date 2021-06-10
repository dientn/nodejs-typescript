import request from 'supertest';
import app from '../../server/server';

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// // May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

const mongoServer = new MongoMemoryServer();;
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
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, mongooseOpts, (err) => {
    if (err) { console.error(err); process.exit(1) }
  });
  mongoose.connection.once('open', () => {
    console.log(`MongoDB Test successfully connected to ${mongoUri}`);
  });

  await mongoose.model("User").deleteMany();
  // Seed data for test if we need
});

afterAll(async () => {
  // Clear the tested and seeded data
  await mongoose.model("User").deleteMany();
  // Drop collection for this test and related
  await mongoose.connection.db.dropCollection('users');

  await mongoose.disconnect();
  await mongoServer.stop();
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
    //   console.log(res.body)
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
