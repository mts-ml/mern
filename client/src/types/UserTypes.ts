import type { JwtPayload } from "jwt-decode"

export interface UserProps {
    email: string
    password: string
}

export type RegisterErrors = Partial<Record<keyof UserProps, string[]>>

export interface CustomJwtPayload extends JwtPayload{
  UserInfo: {
    email: string
    roles: number[]
  }
}
