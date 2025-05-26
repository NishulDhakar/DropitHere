import {Request ,Response , NextFunction } from "express"
import {JWT_PASSWORD } from "./config"
import jwt from "jsonwebtoken"
import 'dotenv/config';


export const userMiddleware = (req : Request , res : Response , 
    next : NextFunction) =>{
        const header = req.headers["authorization"];

        try{
        const decode = jwt.verify(header as string , JWT_PASSWORD);

        if(decode){
            //@ts-ignore
            req.userId = decode.id
            next();
        }else{
            res.status(403).json({
                massage : "You are not logged in"
            })
        }
    }catch(e){
        res.status(403).json({
            massage : "incorrect token"
        })
    }
    }