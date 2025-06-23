import { Request, Response } from "express"
import { User } from "../model/Users.js"


export async function handleLogout(req: Request, res: Response) {
    const isProduction = process.env.NODE_ENV === 'production'

    const refreshToken = req.cookies.jwt as string | undefined
    if (!refreshToken) {
        res.status(401).json({
            message: "User unauthorized"
        })
        return
    }

    try {
        const foundUser = await User.findOne({ refreshToken })
        if (!foundUser) {
            res.clearCookie(
                'jwt',
                {
                    httpOnly: true,
                    secure: isProduction,
                    sameSite: isProduction ? 'none' : 'lax'
                }
            )
            res.sendStatus(204)
            return
        }

        foundUser.refreshToken = ''
        await foundUser.save()

        res.clearCookie(
            'jwt',
            {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? 'none' : 'lax'
            }
        )

        res.sendStatus(204)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}
