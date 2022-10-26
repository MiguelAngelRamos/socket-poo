//* Referencias al DOM
const online = document.querySelector('#socket-online');
const offline = document.querySelector('#socket-offline');
const txtMessage = document.querySelector('#message');
const btnEnviar = document.querySelector('#btn-enviar');


//* Desde el cliente nos conectamos

const socket = io("http://localhost:3010/");

//* on "Escucha eventos como el connect"

socket.on('connect', () => {
  console.log('Conectado al Servidor');
  offline.style.display = 'none';
  online.style.display = '';
});

socket.on('disconnect', () => {
  console.log('disconnecting to the server');
  online.style.display = 'none';
  offline.style.display = '';
});

//* Recibiendo lo que envia el servidor
//* message-server es el evento personalizado en el cual escuchamos
socket.on('message-server', payload => {
  console.log(payload);
});

btnEnviar.addEventListener('click', () => {
  const message = txtMessage.value;

  //* Enviar info al servidor
  const payload = {
    message, 
    id: '39183',
    date: new Date().getTime()
  }
  socket.emit('send-message', payload, (id) => {
    //* Este mensaje lo lee solo el cliente que emite
    console.log('Desde el Servidor', id);
  })

  //* Este es el callback que enviamos al servidor y que recibimos de vuelta, este callback lo recibe solo el cliente que lo emite y no todos de manera global
  // (id) => {
  //   //* Este mensaje lo lee el que emite
  //   console.log('Desde el Servidor', id);
  // }
})
