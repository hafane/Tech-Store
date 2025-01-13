import {NextFunction, Request, Response} from "express";
import SetError from "../Errors/SetError";
import TokenService from "../token/tokenService";
import { Role } from "@prisma/client"

declare global {
    namespace Express {
        interface Request {
            user: {
                id: number;
                username: string;
                email: string;
                role: Role;
            }
        }
    }
}

export default function(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization!.split(" ")[1]
        if(!token) {
            return next(SetError.UnauthorizedException())
        }
        const validatedAccess = TokenService.validateAccess(token)
        if(!validatedAccess) {
            return next(SetError.UnauthorizedException())
        }
        req.user = validatedAccess
        next()
    } catch (e) {
        return next(SetError.UnauthorizedException())
    }
}