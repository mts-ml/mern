import { LoginErrors, UserProps } from "../types/userTypes";


export function addError(errors: LoginErrors, field: keyof UserProps, message: string) {
    errors[field] = [...(errors[field] || []), message]
}
