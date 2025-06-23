import { Request, Response } from "express"
import { UserProps } from "../types/userTypes.js"
import { User } from "../model/Users.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export async function handleLogin(req: Request<{}, {}, UserProps>, res: Response) {
    const { email, password } = req.body

    try {
        const foundUser = await User.findOne({ email })
        if (!foundUser) {
            res.status(401).json({
                message: "Invalid credentials"
            })
            return
        }

        const matchPassword = await bcrypt.compare(password, foundUser.password)
        if (matchPassword) {
            const roles = Object.values(foundUser.roles).filter(value => value !== undefined)

            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        email: foundUser.email,
                        roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET!,
                { expiresIn: "30s" }
            )

            const refreshToken = jwt.sign(
                {
                    UserInfo: {
                        email: foundUser.email,
                        roles: foundUser.roles
                    }
                },
                process.env.REFRESH_TOKEN_SECRET!,
                { expiresIn: '1d' }
            )

            foundUser.refreshToken = refreshToken
            await foundUser.save()

            const isProduction = process.env.NODE_ENV === 'production'
            res.cookie('jwt',
                refreshToken,
                {
                    httpOnly: true,
                    secure: isProduction,
                    sameSite: isProduction ? 'none' : 'lax',
                    maxAge: 7 * 24 * 60 * 60 * 1000
                }
            )

            res.json({ accessToken })
        } else {
            res.status(401).json({
                message: "Invalid credentials"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}
