import express from 'express';
import routes from './routes'
import passport from 'passport';

import './configs/passport'

const server = express();

// initialize passport with express
server.use(passport.initialize());

// parse application/json
server.use(passport.session());

// parse application/json
server.use(express.json());

//parse application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

server.use('/api', routes);

export default server;