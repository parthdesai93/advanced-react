require('dotenv').config({path: '.env'});
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  res => console.log(`server is now running on ${res.port}`)
);
