import { config } from "dotenv";
config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http"
import { Server } from "socket.io";

import socket from "./socket"

import { protect } from "./middleware/authMiddleware"
import * as authControllers  from "./controllers/authControllers"
import * as roomControllers from "./controllers/roomControllers"

const PORT = process.env.PORT || 5000;
const app = express();

const httpServer = http.createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(cors({ origin: "*", }));
app.use(express.json());

app.post('/register', authControllers.register);
app.post('/login', authControllers.login);
app.get('/userInfo', protect, authControllers.userInfo);
app.post('/create-room', protect, roomControllers.createRoom)
app.post('/join-room', protect, roomControllers.joinRoom)
app.get("/room/:roomId", protect, roomControllers.getRoom)

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  httpServer.listen(PORT);
  socket({io});
});