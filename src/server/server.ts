import express from 'express';
import routes from './index.route'

const server = express();
server.use(express.json());

server.use('/api', routes);

export default server;