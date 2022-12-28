import { Socket, Server } from 'socket.io'
import Room from "./models/room"

// so basically, he sat a connection listener for when a user sends a message, and this
// connection is emitted from the client to send the data to the backend,
// then in the backend he makes another connection to send the data to all connected clients

function socket({ io }: { io: Server }) {
  console.info("Sockets working");

  io.on("connection", (socket: Socket) => {
    console.info(`User connected ${socket.id}`)
    
    const query = socket.handshake.query
    const id = query.id ?? null
    if(id){
      socket.join(id)
      console.log(`joined room with id ${id}`)
    } else {
      console.log("no id was provided")
    }
    
    socket.on("client-send-message", async({ roomId, body, sender }) => {
      const room = await Room.findById(roomId)
      const date = new Date();
      await room?.updateOne({ $push: {messages: {
        sender,
        body,
        sentAt: `${date.getHours()}:${date.getMinutes()}`
      }}})

    socket.to(roomId).emit("server-send-message", {
      body,
      sender,
      sentAt: `${date.getHours()}:${date.getMinutes()}`
    })

    })

    socket.on('disconnect', () => {
      console.log(`User with id: ${socket.id} has disconnected`);
    });
  })

}

export default socket