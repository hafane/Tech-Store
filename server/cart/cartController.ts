import { NextFunction, Request, Response } from "express"
import { DeleteItemDTO } from "./dto/DeleteItemDTO"
import { DTOValidation } from "../utils/DTOValidation"
import CartService from "./cartService"
import { CreateCartItemDTO } from "./dto/CreateCartItemDTO"
import { UpdateItemQuantity } from "./dto/updateItemQuantity"

class CartController {
	async getCart(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.user
			const cart = await CartService.getUserCart(id)
			res.status(200).json(cart)
		} catch (error) {
			next(error)
		}
	}

	async updateCartItemQuantity(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.user
			const dto = new UpdateItemQuantity(req.body)
			await DTOValidation(dto, "Произошла ошибка при валидации данных.")
			const updatedCart = await CartService.updateItemQuantity(dto, id)
			res.status(200).json(updatedCart)
		} catch (error) {
			next(error)
		}
	}

	async addCartItem(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.user
			const dto = new CreateCartItemDTO(req.body)
			await DTOValidation(dto, "Произошла ошибка при валидации данных.")
			const updatedCart = await CartService.addCartItem(dto, id)
			res.status(200).json(updatedCart)
		} catch (error) {
			next(error)
		}
	}

	async deleteOneItem(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const { id } = req.user
			const dto = new DeleteItemDTO(req.body)
			await DTOValidation(dto, "Произошла ошибка при валидации данных.")
			const deletedItem = await CartService.deleteOne(dto, id)
			res.status(200).json(deletedItem)
		} catch (error) {
			next(error)
		}
	}
}

export default new CartController()
