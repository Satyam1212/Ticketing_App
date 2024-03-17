import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}


export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        return next(); //we want to move on next middleware
    }
    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;//here we get either string or object
        //now we want to add one more property in existing object
        req.currentUser = payload;
    } catch (err) {
        res.send({ currentUser: null })
    }
    next();




}