import { JwtPayload } from "jsonwebtoken"


export interface UserProps {
    email: string
    password: string
    refreshToken?: string
}

export type LoginErrors = Partial<Record<keyof UserProps, string[]>>

export interface CustomJwtPayload extends JwtPayload {
    email: string
}
