import { Response, Request, NextFunction } from "express"
import { ILogout, IRefresh } from "../types/userTypes"
import { LoginDTO } from "./dto/LoginDTO"
import { RegistrationDTO } from "./dto/RegistrationDTO"
import { DTOValidation } from "../utils/DTOValidation"
import AuthService from "./authService"

class AuthController {
	async registration(req: Request, res: Response, next: NextFunction) {
		try {
			const dto = new RegistrationDTO(req.body)
			await DTOValidation(dto, "Произошла ошибка при валидации данных.")
			const userData = await AuthService.registration(dto)
			res.cookie("refreshCookie", userData.refreshToken, {
				httpOnly: true,
				maxAge: 7 * 24 * 60 * 60 * 1000,
				domain: "localhost",
			})
			res.status(200).json(userData)
		} catch (e) {
			next(e)
		}
	}

	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const dto = new LoginDTO(req.body)
			await DTOValidation(dto, "Произошла ошибка при валидации данных.")
			const loginUser = await AuthService.login(dto)
			res.cookie("refreshCookie", loginUser.refreshToken, {
				httpOnly: true,
				maxAge: 7 * 24 * 60 * 60 * 1000,
				domain: "localhost",
			})
			res.status(200).json(loginUser)
		} catch (e) {
			next(e)
		}
	}

	async logout(req: ILogout, res: Response, next: NextFunction) {
		try {
			const { refreshCookie } = req.cookies
			const out = await AuthService.logout(refreshCookie)
			res.clearCookie("refreshCookie", { path: "/" })
			res.status(200).json({ ...out })
		} catch (e) {
			next(e)
		}
	}

	async refreshReload(req: IRefresh, res: Response, next: NextFunction) {
		try {
			const { refreshCookie } = req.cookies
			const refre = await AuthService.refresh(refreshCookie)
			res.cookie("refreshCookie", refre.refreshToken, {
				httpOnly: true,
				maxAge: 7 * 24 * 60 * 60 * 1000,
				domain: "localhost",
			})
			res.status(200).json(refre)
		} catch (e) {
			next(e)
		}
	}
}

export default new AuthController()
