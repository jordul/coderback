require('dotenv').config()

const Server = require('./src/sever');

const server = new Server();

server.listen();

