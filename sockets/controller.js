const socketController = socket => {
  
  console.log('Cliente conectado', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Cliente desconectado', socket.id);
  });

  socket.on('send-message', (payload, callback) => {
    const id = 119314;
    callback(id);
    console.log(payload);
    //* va enviar un mensaje a todos menos al que realiza el mensaje
    socket.broadcast.emit('message-server', payload);
    //* el broadcast se emite para los clientes conectados excepto para el que envio el mensaje
    //* vea este mensaje desde la consola de otro cliente 
  });
}

module.exports = {
  socketController
}