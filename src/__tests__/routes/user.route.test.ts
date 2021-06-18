import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../server/server';
import { MongoMemoryServer } from 'mongodb-memory-server';
import randomstring from 'randomstring';
// import jwt from 'jsonwebtoken';

let mongoServer: MongoMemoryServer;
let user: any = {
  email: 'admin@microsoft.com',
  firstName: 'Admin',
  lastName: 'Admin',
  password: randomstring.generate()
};
let token: string;
let server = request(app);

// // May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
jest.setTimeout(600000);
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
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, mongooseOpts, (err) => {
    if (err) console.error(err);
  });
  
  // await mongoose.model("User").deleteMany();
  // Seed data for test if we need
  await mongoose.model('User').create(user);

  // let payload = { user : { id: user?._id, email } };
  // token = jwt.sign(payload, config.passport.secret, {expiresIn : config.passport.expiresIn});

  // get token
  const res = await server
      .post('/api/login')
      .send({
        email: user.email,
        password: user.password
      });

  token = res.body.token;
});

afterAll(async () => {
  // Clear the tested and seeded data
  // await mongoose.model("User").deleteMany(err =>{
  //   if (err) {
  //     console.error(err);
  //   }
  // });
  // Drop collection for this test and related
  await mongoose.connection.db.dropCollection('users');
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Users Endpoints', () => {
  let userId: string | null = null;
  
  it('should create a new user', async () => {
    const res = await server
      .post('/api/users')
      .auth(token, {type: 'bearer'})
      .send({
        email: 'bill@microsoft.com',
        firstName: 'Bill',
        lastName: 'Gates',
        password: randomstring.generate()
      });
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('user');
    userId = res.body.user._id;
  });

  it('should fetch a single user', async () => {
    const res = await server
      .get(`/api/users/${userId}`)
      .auth(token, {type: 'bearer'});
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('user');
  });

  it('should fetch all user', async () => {
    const res = await server.get('/api/users').auth(token, {type: 'bearer'});
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('users');
    expect(res.body.users).toHaveLength(2);
  });

  it('should update a user', async () => {
    const res = await server
      .put(`/api/users/${userId}`)
      .auth(token, {type: 'bearer'})
      .send({
        firstName: 'updated firstName',
        lastName: 'updated lastName',
      });

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('firstName', 'updated firstName');
  });

  // it('should update a user return status code 500 if id incorrect ', async () => {
  //   const res = await server
  //     .put(`/api/users/212121212`)
  //     .auth(token, {type: 'bearer'})
  //     .send({
  //       firstName: 'updated firstName',
  //       lastName: 'updated lastName',
  //     });

  //   expect(res.status).toEqual(500);
  //   expect(res.body).toHaveProperty('error');
  //   console.log(res.body)
  // });

  it('should return status code 404 if email existed', async () => {
    const res = await server
      .post('/api/users')
      .auth(token, {type: 'bearer'})
      .send({
        email: 'bill@microsoft.com',
        firstName: 'Bill',
        lastName: 'Gates'
      });
    expect(res.status).toEqual(500);
    expect(res.body).toHaveProperty('error');
  });

  it('should delete a user', async () => {
    const res = await server.delete(`/api/users/${userId}`).auth(token, {type: 'bearer'});
    expect(res.status).toEqual(204);
  });

  it('should respond with status code 404 if resource is not found', async () => {
    const res = await server.get(`/api/users/${userId}`).auth(token, {type: 'bearer'});
    expect(res.status).toEqual(404);
  });
});
