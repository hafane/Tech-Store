import { NextFunction, Response, Request } from "express"
import { CreateItemDTO } from "./dto/createItemDTO"
import { DTOValidation } from "../utils/DTOValidation"
import {
	IDeleteItemWithDep,
	IGetAllItems,
	IGetOneItem,
	ISearchItem,
} from "../types/itemTypes"
import ItemService from "./itemService"

class ItemController {
	async createItem(req: Request, res: Response, next: NextFunction) {
		try {
			const dto = new CreateItemDTO(req.body)
			await DTOValidation(dto, "Произошла ошибка при валидации данных.")
			const createdItem = await ItemService.create(dto, req.files as Express.Multer.File[])
			res.status(201).json(createdItem)
		} catch (error) {
			next(error)
		}
	}

	async getItems(req: IGetAllItems, res: Response, next: NextFunction) {
		try {
			const { category, brand, available, priceFrom, priceTo, page, sort } = req.query
			const items = await ItemService.getAllItems(category, brand, available, priceFrom, priceTo, page, sort)
			res.status(200).json(items)
		} catch (error) {
			next(error)
		}
	}

	async searchItems(req: ISearchItem, res: Response, next: NextFunction) {
		try {
			const { word } = req.query
			const items = await ItemService.searchItems(word as string)
			res.status(200).json(items)
		} catch (error) {
			next(error)
		}
	}

	async getOne(req: IGetOneItem, res: Response, next: NextFunction) {
		try {
			const { itemId } = req.params
			const one = await ItemService.getOneItem(+itemId)
			res.status(200).json(one)
		} catch (error) {
			next(error)
		}
	}

	async deleteItemWithDependencies(
		req: IDeleteItemWithDep,
		res: Response,
		next: NextFunction
	) {
		try {
			const { itemId } = req.params
			const deletedItem = await ItemService.deleteOneItem(+itemId)
			res.status(200).json(deletedItem)
		} catch (error) {
			next(error)
		}
	}
}

export default new ItemController()
