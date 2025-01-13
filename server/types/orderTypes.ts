import { OrderStatus } from "@prisma/client"

export interface IGetUserOrders extends Express.Request {
	query: {
		status: OrderStatus
	}
}
