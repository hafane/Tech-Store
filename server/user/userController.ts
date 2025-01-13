import { Response, Request, NextFunction } from "express"
import UserService from "./userService"
import {
	IActivate,
} from "../types/userTypes"
import { ChangePersonalDTO } from "./dto/changePersonalDTO"
import { DTOValidation } from "../utils/DTOValidation"

class UserController {
	async getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await UserService.getUsers()
			res.json(users)
		} catch (e) {
			next(e)
		}
	}

	async changePersonal(
		req: Request,
		res: Response,
		next: NextFunction
	) {
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
			const { id } = req.user
			const activation = await UserService.activate(id, link)
			res
				.status(200)
				.send(
					`<h1>${activation.message}</h1>` +
						`<button type="submit"><a href="http://localhost:3000/">Вернуться на главную</a></button>`
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
}

export default new UserController()
