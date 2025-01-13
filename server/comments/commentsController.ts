import { NextFunction, Response, Request } from "express"
import { CreateCommDTO } from "./dto/createCommDTO"
import { DTOValidation } from "../utils/DTOValidation"
import { DeleteCommDTO } from "./dto/deleteCommDTO"
import UserCommentsService from "./userCommentsService"
import { IAddComment, IDeleteComment } from "../types/commentTypes"

class CommentsController {
	async addComment(req: IAddComment, res: Response, next: NextFunction) {
		try {
			const dto = new CreateCommDTO(req.body)
			await DTOValidation(dto, "Произошла ошибка при валидации данных.")
			const { itemId } = req.params
			const { id } = req.user
			const commentCreate = await UserCommentsService.addComment(
				id,
				+itemId,
				dto
			)
			res.status(201).json(commentCreate)
		} catch (error) {
			next(error)
		}
	}

	async delete(req: IDeleteComment, res: Response, next: NextFunction) {
		try {
			const dto = new DeleteCommDTO(req.body)
			await DTOValidation(dto, "Произошла ошибка при валидации данных.")
			const { itemId } = req.params
			const { id } = req.user
			const deleteComment = await UserCommentsService.deleteComment(
				id,
				+itemId,
				dto
			)
			res.status(200).json(deleteComment)
		} catch (error) {
			next(error)
		}
	}
}

export default new CommentsController()
