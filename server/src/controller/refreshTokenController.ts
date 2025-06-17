import { Request, Response } from "express";
import { User } from "../model/Users";
import jwt from 'jsonwebtoken'
import { CustomJwtPayload } from "../types/userTypes";


export async function handleRefreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.jwt as string | undefined
    if (!refreshToken) {
        res.status(401).json({
            error: "Token is missing or invalid."
        })
        return
    }

    try {
        const foundUser = await User.findOne({ refreshToken })
        if (!foundUser) {
            res.sendStatus(403)
            return
        }

        const decodedToken = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET!,
        ) as CustomJwtPayload


        if (decodedToken.UserInfo.email !== foundUser.email) {
            res.sendStatus(403)
            return
        }

        const roles = Object.values(foundUser.roles).filter(value => value !== undefined)
        const newAccessToken = jwt.sign(
            {
                UserInfo: {
                    email: decodedToken.UserInfo.email,
                    roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: '30s' }
        )

        res.json({ accessToken: newAccessToken })
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(403).json({
                message: "Refresh token expired."
            })
            return
        }
        console.log(error)
        res.sendStatus(500)
    }
}
