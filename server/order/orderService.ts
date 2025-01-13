import { CartItem, Item, ItemInfo, OrderStatus, PrismaClient } from "@prisma/client"
import SetError from "../Errors/SetError"
import { CreateOrderDTO } from "./dto/createOrderDTO"
import { ChangeStatusDTO } from "./dto/changeStatusDTO"
import { createPayment } from "../payment/Yookassa"
import cartService from "../cart/cartService"
import cartItemService from "../cart/cartItem/cartItemService"
import mailService from "../mail/mailService"

const prisma = new PrismaClient()

class OrderService {
	async createOrder(userId: number, dto: CreateOrderDTO) {
		const findPendingOrder = await prisma.order.findFirst({
			where: {
				userId: userId,
				status: "PENDING",
			},
		})
		if (findPendingOrder) {
			throw SetError.BadRequestException(
				"Вы не можете создать новый заказ, так как у вас уже есть активный заказ."
			)
		}
		const findCart = await cartService.getUserCart(userId)
		if(!findCart) {
			throw SetError.NotFoundException("Корзина не найдена.")
		}
		if(findCart.totalAmount === 0) {
			throw SetError.BadRequestException("Корзина пуста.")
		}
		const createOrder = await prisma.order.create({
			data: {
				userId: userId,
				status: "PENDING",
				totalAmount: findCart.totalAmount,
				items: JSON.stringify(findCart.CartItem),
				...dto,
			},
			include: {
				user: {select: {email: true}}
			}
		})
		await cartService.clearCartAmount(findCart.id)
		await cartItemService.deleteAllItemsFromCart(findCart.id)

		const payment = await createPayment({
			amount: createOrder.totalAmount,
			description: "Оплата заказа № " + createOrder.id,
			orderId: createOrder.id
		})

		if(!payment) {
			throw SetError.BadRequestException("Не удалось создать платеж.")
		}

		await prisma.order.update({
			where: {
				id: createOrder.id
			},
			data: {
				paymentId: payment.data.id
			}
		})

		await mailService.sendOrderMail(createOrder.user.email, payment.data.confirmation.confirmation_url)
		return {url: payment.data.confirmation.confirmation_url}
	}

    async getUserAllOrders(take: number) {
        const foundOrders = await prisma.order.findMany({
			take: take
		})
        if(!foundOrders) {
            throw SetError.NotFoundException("Заказы не найдены.")
        }
        return foundOrders
    }

	async getUserOrders(userId: number, status: OrderStatus) {
		const found = await prisma.order.findMany({
			where: {
				userId: userId,
				status: status,
			}
		})
		if(!found) {
			throw SetError.NotFoundException("Заказы не найдены.")
		}
		return found
	}

	async setOrderStatus(orderId: number, dto: ChangeStatusDTO) {
		const updateOrder = await prisma.order.update({
			where: {
				id: orderId,
			},
			data: {
				status: dto.status,
			},
		})
		if(!updateOrder) {
			throw SetError.BadRequestException("Заказ не удалось обновить.")
		}
		return {message: "Статус заказа был изменен."}
	}

	async paymentCallback(orderId: string, status: string) {
		const order = await prisma.order.findUnique({
			where: {
				id: Number(orderId)
			},
			include: {
				user: true
			}
		})

		if(!order) {
			throw SetError.NotFoundException("Заказ не найден.")
		}

		const newStatus = await prisma.order.update({
			where: {
				id: Number(orderId)
			},
			data: {
				status: status === "succeeded" ? OrderStatus.PROCESSED : OrderStatus.CANCELLED
			}
		})

		if(status === "succeeded") {
			const parsedItems: (CartItem & {Item: Item})[] = JSON.parse(order.items as string)
			parsedItems.map(async item => {
				await prisma.item.update({
					where: {
						id: item.itemId
					},
					data: {
						available: item.Item.available - item.quantity
					}
				})	
			})
			return await mailService.sendOrderSuccessMail(order.user.email, {status: newStatus.status, orderId: newStatus.id})
		} else {
			return await mailService.sendOrderCancelledMail(order.user.email, {status: newStatus.status, orderId: newStatus.id})
		}
	}
}

export default new OrderService()
