const express = require('express');
const cors = require("cors");
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        //* para trabajar socket.io con express
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server); //* le mandamos la configuración del server
        //* io tiene toda la informacion de los sockets conectados
        // Middlewares
        this.middlewares();

        //* Eventos por socket configuración
        this.sockets();
    }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static('public')); //* este va ser nuestro cliente
  }

  sockets() {
    this.io.on('connection', socketController);
    //* a todos los usuarios conectados
  }

  listen() {
    //* Levantamos el servidor
    this.server.listen(this.port, () => {
      console.log(`El Servidor corriendo en el puerto: ${this.port}`);
    });
  }
}

module.exports = Server;