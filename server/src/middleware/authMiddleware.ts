import { config } from "dotenv";
config();

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";


interface JwtPayload { id: string }

export async function protect(req: Request, res: Response, next: NextFunction){
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            
            const { id } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

            req.user = await User.findById(id).select("-password");

            next();
        } catch (error) {
            console.log(error);
            res.status(401).json("Not Authorized");
        }
    }

    if(!token){
        res.status(401).json("Token Not Found");
    }
}