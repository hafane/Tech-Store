import { PrismaClient } from "@prisma/client"
import { DeleteItemDTO } from "../dto/DeleteItemDTO"
import { CreateCartItemDTO } from "../dto/CreateCartItemDTO"
import SetError from "../../Errors/SetError"
import cartService from "../cartService"
import { UpdateItemQuantity } from "../dto/updateItemQuantity"

const prisma = new PrismaClient()

class CartItemService {
	async createCartItem(cartId: number, dto: CreateCartItemDTO) {
		const foundCartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: cartId,
				itemId: dto.itemId,
			},
		})
		if (foundCartItem) {
			await prisma.cartItem.update({
				where: {
					id: foundCartItem.id,
				},
				data: {
					quantity: foundCartItem.quantity + 1,
				},
			})
		} else {
			await prisma.cartItem.create({
				data: {
					cartId: cartId,
					itemId: dto.itemId,
					quantity: 1,
				},
			})
		}
		const updatedCartAmount = await cartService.updateCart(cartId)

		return updatedCartAmount
	}

	async updateItemQuantity(cartId: number, dto: UpdateItemQuantity) {
		return prisma.$transaction(async prisma => {
			const foundCartItem = await prisma.cartItem.findFirst({
				where: {
					cartId: cartId,
					itemId: dto.itemId,
				},
			})
			if (foundCartItem) {
				await prisma.cartItem.update({
					where: {
						id: foundCartItem.id,
					},
					data: {
						quantity: dto.quantity,
					},
				})
			} else {
				throw SetError.NotFoundException("Товар не найден.")
			}
			const updatedCartAmount = await cartService.updateCart(cartId)
			return updatedCartAmount
		})
	}

	async deleteItemFromAllCarts(itemId: number) {
		return prisma.$transaction(async prisma => {
			const carts = await prisma.cart.findMany({
				where: {
					CartItem: {
						some: {
							itemId: itemId,
						},
					},
				},
				include: {
					CartItem: {
						where: {
							itemId: itemId,
						},
						include: {
							Item: true,
						},
					},
				},
			})
			if (!carts) {
				throw SetError.NotFoundException("Корзины не найдены.")
			}
			for (const cart of carts) {
				await prisma.cartItem.deleteMany({
					where: {
						itemId: cart.CartItem[0].itemId,
						cartId: cart.id,
					},
				})
				await prisma.cart.update({
					where: {
						id: cart.id,
					},
					data: {
						totalAmount:
							cart.totalAmount -
							cart.CartItem[0].quantity * cart.CartItem[0].Item.price,
					},
				})
			}
			return
		})
	}

	async deleteOneItemFromCart(dto: DeleteItemDTO, cartId: number) {
		const foundCartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: cartId,
				itemId: dto.itemId,
			},
		})
		if (!foundCartItem) {
			throw SetError.NotFoundException("Предмет корзины не найден.")
		}
		const deletedCartItem = await prisma.cartItem.delete({
			where: {
				id: foundCartItem.id,
			},
			include: {
				Item: true,
			},
		})
		if (!deletedCartItem) {
			throw SetError.BadRequestException("Не удалось удалить предмет корзины.")
		}
		const updatedCartAmount = await cartService.updateCart(cartId)
		return updatedCartAmount
	}

	async deleteAllItemsFromCart(cartId: number) {
		await prisma.cartItem.deleteMany({
			where: {
				cartId: cartId,
			},
		})
		return
	}
}

export default new CartItemService()
