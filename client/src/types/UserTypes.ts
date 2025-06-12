export interface UserProps {
    email: string
    password: string
}

export type LoginErrors = Partial<Record<keyof UserProps, string[]>>
