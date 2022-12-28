import { Request, Response } from "express";
import User from "../models/user";
import Room from "../models/room"

export async function createRoom(req: Request, res: Response) {
  const user = await User.findById(req.user.id);
  const { title } = req.body

  if(!user) return res.status(400).send("An Error Has Occured While Joining The Room")
  if(await Room.findOne({title: title})) return res.status(400).send("Room Name Already Exists")

  const newRoom = new Room({
    title: title,
    members: user?.name
  })
  await newRoom.save()
  await user?.updateOne({ $push: {"chatRooms": newRoom?._id }})
  res.status(201).send(newRoom)
}

export async function joinRoom(req: Request, res: Response) {
  const user = await User.findById(req.user.id);
  const { title } = req.body
  const room = await Room.findOne({title: title})

  if(!user) return res.status(400).send("An Error Has Occured While Joining The Room")
  if(room?.members.includes(user?.name)) return res.status(400).send("You Has Already Joined This Room")
  
  await user?.updateOne({ $push: {"chatRooms": room?.id }})
  await room?.updateOne({ $push: {"members": user?.name }})
  res.status(200).send(room)
}

export async function getRoom(req: Request, res: Response){
  const { roomId } = req.params
  const room = await Room.findById(roomId)

  if(!room) return res.status(400).send("Room Not Found")
  res.status(200).send(room)
}