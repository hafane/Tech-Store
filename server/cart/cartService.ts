import { PrismaClient } from "@prisma/client"
import { DeleteItemDTO } from "./dto/DeleteItemDTO"
import SetError from "../Errors/SetError"
import cartItemService from "./cartItem/cartItemService"
import { CreateCartItemDTO } from "./dto/CreateCartItemDTO"
import { UpdateItemQuantity } from "./dto/updateItemQuantity"

const prisma = new PrismaClient()

class CartService {
	async createUserCart(userId: number) {
		const cart = await prisma.cart.create({
			data: {
				userId: userId,
			},
		})
		return
	}

	async userCartExists(userId: number) {
		const foundCart = await prisma.cart.findFirst({
			where: {
				userId: userId,
			},
		})
		if (!foundCart) {
			throw SetError.NotFoundException("Корзина не найдена.")
		}
		return foundCart
	}

	async getUserCart(userId: number) {
		const foundCart = await prisma.cart.findFirst({
			where: {
				userId: userId,
			},
			include: {
				CartItem: { include: { Item: { include: { brand: true } } } },
			},
		})
		if (!foundCart) {
			throw SetError.NotFoundException("Корзина не найдена.")
		}
		return foundCart
	}

	async addCartItem(dto: CreateCartItemDTO, userId: number) {
		const foundCart = await this.userCartExists(userId)
		const added = await cartItemService.createCartItem(foundCart.id, dto)
		return { message: "Товар был добавлен в корзину.", cart: added }
	}

	async clearCartAmount(cartId: number) {
		await prisma.cart.update({
			where: {
				id: cartId
			},
			data: {
				totalAmount: 0
			}
		})
		return
	}

	async updateItemQuantity(dto: UpdateItemQuantity, userId: number) {
		const foundCart = await this.userCartExists(userId)
		const updated = await cartItemService.updateItemQuantity(foundCart.id, dto)
		return { message: "Количество товара было обновлено.", cart: updated }
	}

	async updateCart(cartId: number) {
		const cart = await prisma.cart.findUnique({
			where: {
				id: cartId,
			},
			include: {
				CartItem: {
					include: {
						Item: true,
					},
				},
			},
		})
		const calcTotalPrice = cart?.CartItem.reduce(
			(acc, item) => acc + item.Item.price * item.quantity,
			0
		)
		const updatedCart = await prisma.cart.update({
			where: {
				id: cartId,
			},
			data: {
				totalAmount: calcTotalPrice,
			},
			include: {
				CartItem: {
					include: {
						Item: {include: { brand: true }},
					},
				},
			},
		})
		return updatedCart
	}

	async deleteOne(dto: DeleteItemDTO, userId: number) {
		const cart = await this.userCartExists(userId)
		const deleted = await cartItemService.deleteOneItemFromCart(dto, cart.id)
		return { message: "Товар был удален из корзины.", cart: deleted }
	}
}

export default new CartService()
