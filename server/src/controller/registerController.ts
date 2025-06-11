import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { User } from '../model/users'
import { UserProps } from '../types/registerTypes'


export async function handleNewUser(req: Request<{}, {}, UserProps>, res: Response) {
    const { email, password } = req.body

    const duplicate = await User.findOne({ email })
    if (duplicate) {
        res.status(409).json({
            error: "Email already in database, choose another."
        })
        return
    }

    try {
        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            email,
            password: hashPassword
        })
        console.log(`registerController - ${newUser}`) 
        
        res.status(201).json({
            success: `New user ${newUser} created.`
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Internal server error."
        })
    }
}
