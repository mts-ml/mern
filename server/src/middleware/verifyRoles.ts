import { NextFunction, Response, Request } from "express";


interface RequestWithRoles extends Request {
    roles?: number[]
}


export function verifyRoles(...allowedRoles: number[]) {
    return (req: RequestWithRoles, res: Response, next: NextFunction) => {
        console.log(`verifyRoles - Allowed roles: ${JSON.stringify(allowedRoles)}`)
        console.log(`verifyRoles - User roles: ${JSON.stringify(req.roles)}`)

        if (!req?.roles) {
            res.status(401).json({
                message: "User not authenticated"
            })
            return
        }

        const hasPermission = req.roles.some(role => allowedRoles.includes(role))
        if (!hasPermission) {
            res.status(403).json({
                message: "User doesn't have authorization to perform this action"
            })
            return
        }

        next()
    }
}
