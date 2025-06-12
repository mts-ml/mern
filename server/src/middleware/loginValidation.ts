import { NextFunction, Request, Response } from "express"
import { LoginErrors, UserProps } from "../types/userTypes"
import { addError } from "../utils/utils"


export async function loginValidation(req: Request<{}, {}, UserProps>, res: Response, next: NextFunction) {
    const errors: LoginErrors = {}
    const { email, password } = req.body

    if (!email) {
        addError(errors, 'email', 'This field is required')
    }
    if (!password) {
        addError(errors, 'password', 'This field is required')
    }

    if (Object.keys(errors).length > 0) {
        res.status(400).json({
            errors
        })
        return
    } else {
        next()
    }
}
