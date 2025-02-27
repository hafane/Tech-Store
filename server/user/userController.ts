import { Response, Request, NextFunction } from "express"
import UserService from "./userService"
import { IActivate, ICheckToken, ICreateReset } from "../types/userTypes"
import { ChangePersonalDTO } from "./dto/changePersonalDTO"
import { DTOValidation } from "../utils/DTOValidation"
import { ResetPasswordDTO } from "./dto/resetPasswordDTO"

class UserController {
	async getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await UserService.getUsers()
			res.json(users)
		} catch (e) {
			next(e)
		}
	}

	async changePersonal(req: Request, res: Response, next: NextFunction) {
		try {
			const dto = new ChangePersonalDTO(req.body)
			await DTOValidation(dto, "Произошла ошибка при валидации данных.")
			const { id } = req.user
			const changedData = await UserService.changePersonal(id, dto)
			res.cookie("refreshCookie", changedData.refreshToken, {
				httpOnly: true,
				maxAge: 7 * 24 * 60 * 60 * 1000,
				domain: "localhost",
			})
			res.status(200).json(changedData)
		} catch (e) {
			next(e)
		}
	}

	async createMailActivateLink(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const { id, username } = req.user
			const createdLink = await UserService.createActivateLink(id, username)
			res.status(201).json(createdLink)
		} catch (e) {
			next(e)
		}
	}

	async activateMail(req: IActivate, res: Response, next: NextFunction) {
		try {
			const { link } = req.params
			const activation = await UserService.activate(link)
			res.status(200).send(
				`<div style="width: 1024px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; justify-content: center;">
						<h1>${activation.message}</h1>
						<button style="margin-top: 20px; padding: 10px; border-radius: 5px; border: none; background-color: #4CAF50;" type="submit"><a style="text-decoration: none; color: white;" href="http://localhost:3000/">Вернуться на главную</a></button>
					</div>`
			)
		} catch (e) {
			next(e)
		}
	}

	async setUserAdmin(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.params
			const newAdmin = await UserService.setUserAsAdmin(Number(userId))
			res.status(200).json(newAdmin)
		} catch (error) {
			next(error)
		}
	}

	async createResetLink(req: Request, res: Response, next: NextFunction) {
		try {
			const { email } = req.body
			const reset = await UserService.createResetLink(email)
			res.status(201).json(reset)
		} catch (error) {
			next(error)
		}
	}

	async checkResetTokenForExpired(
		req: ICheckToken,
		res: Response,
		next: NextFunction
	) {
		try {
			const { token } = req.params
			const checked = await UserService.checkToken(token)
			res.status(200).json(checked)
		} catch (error) {
			next(error)
		}
	}

	async ResetPassword(req: ICreateReset, res: Response, next: NextFunction) {
		try {
			const dto = new ResetPasswordDTO(req.body)
			await DTOValidation(dto, "Произошла ошибка при валидации данных.")
			const { link } = req.params
			const reset = await UserService.resetUserPassword(link, dto)
			res.status(200).json(reset)
		} catch (error) {
			next(error)
		}
	}
}

export default new UserController()
