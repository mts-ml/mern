import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { UserProps } from '../types/userTypes'
import { User } from '../model/Users'


export async function handleNewUser(req: Request<{}, {}, UserProps>, res: Response) {
    const { email, password } = req.body

    const duplicate = await User.findOne({ email })
    if (duplicate) {
        res.status(409).json({
            message: "Email already in database, choose another."
        })
        return
    }

    try {
        const hashPassword = await bcrypt.hash(password, 10)

        // Roles'll be created with User property
        // Made default at User schema (BD)
        const newUser = await User.create({
            email,
            password: hashPassword
        })
        console.log(`registerController - ${newUser}`) 
        
        res.status(201).json({
            message: `New user ${newUser} created.`
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error."
        })
    }
}
