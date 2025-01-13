import {NextFunction, Response, Request} from "express";
import SetError from "../Errors/SetError";
import TokenService from "../token/tokenService";

export default function (role: string[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization!.split(" ")[1]
            if (!token) {
                return next(SetError.UnauthorizedException())
            }
            const validatedAccess = TokenService.validateAccess(token)
            if (!validatedAccess) {
                return next(SetError.UnauthorizedException())
            }
            if (!role.includes(validatedAccess.role)) {
                return next(SetError.ForbiddenException("У вас недостаточно прав."))
            }
            req.user = validatedAccess
            next()
        } catch (e) {
            return next(SetError.UnauthorizedException())
        }
    }
}