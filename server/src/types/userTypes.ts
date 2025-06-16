import { JwtPayload } from "jsonwebtoken"


export interface UserProps {
    email: string
    password: string
    roles: Roles
    refreshToken?: string
}

export type LoginErrors = Partial<Record<keyof UserProps, string[]>>

export interface CustomJwtPayload extends JwtPayload {
    UserInfo: {
        email: string,
        roles: number[]
    }
}

interface Roles {
    Admin?: number
    Editor?: number
    User: number
}
