import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../server/server';
import { MongoMemoryServer } from 'mongodb-memory-server';
import randomstring from 'randomstring';
// import jwt from 'jsonwebtoken';

let mongoServer: MongoMemoryServer;

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

  // Seed data for test if we need

  // let payload = { user : { id: user?._id, email } };
  // token = jwt.sign(payload, config.passport.secret, {expiresIn : config.passport.expiresIn});
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
  let user = {
    email: 'bill@microsoft.com',
    firstName: 'Bill',
    lastName: 'Gates',
    password: randomstring.generate()
  };
  it('should signup success', async () => {
    const res = await server
      .post('/api/signup')
      .send(user);
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('email');
  });

  it('should signup fail with existed user', async () => {
    const res = await server
      .post('/api/signup')
      .send(user);
      expect(res.status).toEqual(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toEqual('User existed');
  });


  it('should login success', async () => {
    const res = await server
      .post(`/api/login`)
      .send({
        email: user.email,
        password: user.password
      });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  // it('should login fail and return 401 with empty email', async () => {
  //   const res = await server
  //     .post(`/api/login`)
  //     .send({
  //       email: user.email,
  //       password: user.password
  //     });
  //   expect(res.status).toEqual(401);
  //   expect(res.body).toHaveProperty('error');
  //   expect(res.body.error).toEqual('Email or Password is required');
  // });

  it('should login fail and return 401 with empty email', async () => {
    const res = await server
      .post(`/api/login`)
      .send({
        password: user.password
      });
    expect(res.status).toEqual(401);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Email or Password is required');
  });

  it('should login fail and return 401 with email not existed', async () => {
    const res = await server
      .post(`/api/login`)
      .send({
        email: "anyemail@dssd.com", 
        password: user.password
      });
    expect(res.status).toEqual(401);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Email not existed');
  });

  it('should login fail and return 401 with password incorrect', async () => {
    const res = await server
      .post(`/api/login`)
      .send({
        email: user.email,
        password: "incorrect password"
      });
    expect(res.status).toEqual(401);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Password is incorrect');
  });
});
