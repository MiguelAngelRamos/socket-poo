require('dotenv').config();
const Server = require('./server/server');
const serverSocket = new Server();
serverSocket.listen();
