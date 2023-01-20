import { config } from "dotenv";
config();

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import Room from "../models/room"


const generateToken = (id: String) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: "2d",
    });
} 

export async function register(req: Request, res: Response) {
    const {name, email, password} = req.body;
    const userExists = await User.findOne({ $or:[{name}, {email}]});

    if (!name || !email || !password) {
        return res.status(400).json("All Fields Are Required");
    }

    if(userExists){
        return res.status(400).json("Username Or Email Already In Use");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        watchlist: []
    });

    if(user){
        res.status(201).json({ token: generateToken(user.id) });
    } else {
        res.status(400).json("Invalid User Data");
    }
}

export async function login(req: Request, res: Response) {
    const {name, password} = req.body;

    const user = await User.findOne({$or:[{name: name}, {email: name}]});
    
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({ token: generateToken(user.id) });
    } else {
        res.status(400).json("Username Or Password Is Incorrect");
    }
}

export async function userInfo(req: Request, res: Response) {
  const { _id, name, email, chatRooms }: any = await User.findById(req.user.id);
  const rooms = await Room.find({_id: chatRooms})
  res.status(200).json({
    _id,
    name,
    email,
    rooms,
    chatRooms
  });
}
