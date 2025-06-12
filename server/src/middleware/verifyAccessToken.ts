import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { CustomJwtPayload } from "../types/userTypes";


interface CustomRequest extends Request {
    email: string
}


export async function verifyAccessToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({
            error: "Token missing or invalid"
        })
        return
    }

    try {
        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET!,
        ) as CustomJwtPayload

        (req as CustomRequest).email = decoded.email
        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ error: "Token expired" })
            return
        }
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(403).json({ error: "Invalid Token" })
            return
        }

        console.log(error)
        res.sendStatus(500)
    }
}
