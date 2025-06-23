import { Request, Response } from "express"
import { LoginErrors, UserProps } from "../types/userTypes.js"


export function addError(errors: LoginErrors, field: keyof UserProps, message: string) {
    errors[field] = [...(errors[field] || []), message]
}


export function getServerTime(req: Request, res: Response) {
    res.json({ serverTime: Date.now() })
}
