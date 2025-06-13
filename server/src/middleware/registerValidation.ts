import { Request, Response, NextFunction } from "express";
import { UserProps } from "../types/userTypes";
import { addError } from "../utils/utils";




export function formValidation(req: Request<{}, {}, UserProps>, res: Response, next: NextFunction) {
    // - 'errors' é um objeto que pode conter as propriedades 'email' e 'password' (entre outras que existirem em RegisterProps).
    // - Essas propriedades são opcionais (por causa do Partial), ou seja, podem estar presentes ou não no objeto.
    // - Cada propriedade, se existir, será um array de strings (string[]), representando uma lista de mensagens de erro para aquele campo.
    // - O 'Record<keyof RegisterProps, string[]>' significa: para cada chave que existe em RegisterProps, o valor será um array de strings.
    // - No início, o objeto é inicializado vazio ({}), ou seja, nenhuma propriedade está definida ainda.
    // - Portanto, quando acessamos uma propriedade, ela pode ser undefined caso ainda não tenha sido adicionada.
    const errors: Partial<Record<keyof UserProps, string[]>> = {}

    const { email, password } = req.body

    /*
    if (!email) {
        if (!errors.email) errors.email = [];
        errors.email.push("This field is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (!errors.email) errors.email = [];
        errors.email.push("Invalid email address");
    } */
    if (!email) {
        // Antes de adicionar a mensagem, verificamos se 'errors.email' já existe.
        // Se ainda não foi criada (ou seja, está undefined), usamos um array vazio como fallback.
        // Isso evita erros e permite adicionar a mensagem corretamente no array.
        // errors.email = [...(errors.email || []), message]
        addError(errors, 'email', "This field is required")
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        addError(errors, 'email', "Invalid email address")
    }

    if (!password) {
        addError(errors, 'password', 'This field is required')

    }
    if (password.length < 8) {
        addError(errors, 'password', 'Password needs at least 8 characters')
    }

    
    const hasNumber = /\d/.test(password)
    const hasUpperCaseLetter = /[A-Z]/.test(password)
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (!hasNumber) {
        addError(errors, 'password', 'Password must contain at least one number')
    }
    if (!hasUpperCaseLetter) {
        addError(errors, 'password', 'Password must contain at least one uppercase letter')
    }
    if (!hasSpecialCharacter) {
        addError(errors, 'password', 'Password must contain at least one special character')
    }


    if (Object.keys(errors).length > 0) {
        res.status(400).json({ errors })
        return
    }

    next()
}
