const io = require('socket.io')(5000, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
      }
})

io.on('connection', socket => {
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on('send-message', ({sender, Recepient, message}) => {
      socket.broadcast.to(Recepient).emit('receive-message', {
        message: Recepient, sender: sender, message
      })
  })
})