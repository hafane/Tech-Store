import { NextFunction, Request, Response } from "express"
import { CreateOrderDTO } from "./dto/createOrderDTO"
import { DTOValidation } from "../utils/DTOValidation"
import { ChangeStatusDTO } from "./dto/changeStatusDTO"
import orderService from "./orderService"
import { IGetUserOrders } from "../types/orderTypes"

class OrderController {
	async createNewOrder(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.user
			const dto = new CreateOrderDTO(req.body)
			await DTOValidation(dto, "Произошла ошибка при валидации данных.")
			const create = await orderService.createOrder(id, dto)
			res.status(201).json(create)
		} catch (error) {
			next(error)
		}
	}

	async getAllUserOrders(req: Request, res: Response, next: NextFunction) {
		try {
			const {take} = req.query
			const orders = await orderService.getUserAllOrders(+take!)
			res.status(200).json(orders)
		} catch (error) {
			next(error)
		}
	}

	async getUserOrders(req: IGetUserOrders, res: Response, next: NextFunction) {
		try {
			const {id} = req.user
			const {status} = req.query
			const orders = await orderService.getUserOrders(id, status)
			res.status(200).json(orders)
		} catch (error) {
			next(error)
		}
	}

	async changeOrderStatus(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const dto = new ChangeStatusDTO(req.body)
			await DTOValidation(dto, "Произошла ошибка при валидации данных.")
			const { orderId } = req.params
			const status = await orderService.setOrderStatus(Number(orderId), dto)
			res.status(200).json(status)
		} catch (error) {
			next(error)
		}
	}
}

export default new OrderController()
