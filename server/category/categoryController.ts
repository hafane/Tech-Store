import { NextFunction, Response, Request } from "express"
import { CategoryAddDTO } from "./dto/CategoryAddDTO"
import CategoryService from "./categoryService"
import { DTOValidation } from "../utils/DTOValidation"

class CategoryController {
	async getCategories(req: Request, res: Response, next: NextFunction) {
		try {
			const categories = await CategoryService.getAllCategories()
			res.status(200).json(categories)
		} catch (error) {
			next(error)
		}
	}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const dto = new CategoryAddDTO(req.body)
			await DTOValidation(dto, "Произошла ошибка при валидации данных.")
			const createdCategory = await CategoryService.createCategory(dto)
            res.status(201).json(createdCategory)
		} catch (error) {
            next(error)
        }
	}

	async change(req: Request, res: Response, next: NextFunction) {
		try {
			const {categoryId} = req.params
			const dto = new CategoryAddDTO(req.body)
			await DTOValidation(dto, "Произошла ошибка при валидации данных.")
			const changedCategory = await CategoryService.changeCategory(+categoryId, dto)
			res.status(200).json(changedCategory)
		} catch (error) {
			next(error)
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const {categoryId} = req.params
			const deleted = await CategoryService.deleteCategory(+categoryId)
			res.status(200).json(deleted)
		} catch (error) {
			next(error)
		}
	}
}

export default new CategoryController()