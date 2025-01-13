import { PrismaClient } from "@prisma/client"
import itemInfoService from "./itemInfo/itemInfoService"
import SetError from "../Errors/SetError"
import { CreateItemDTO } from "./dto/createItemDTO"
import { unlink } from "fs"
import userCommentsService from "../comments/userCommentsService"
import cartItemService from "../cart/cartItem/cartItemService"

const prisma = new PrismaClient()

class ItemService {
	async create(dto: CreateItemDTO, files: Express.Multer.File[]) {
		const images = files.map(file => file.filename)
		const created = await prisma.item.create({
			data: {
				name: dto.name,
				categoryId: dto.categoryId,
				image: images,
				brandId: dto.brandId,
				price: dto.price,
				available: dto.available,
			},
		})
		if (created.id && dto.info.length > 0) {
			const information = dto.info.map(async item => {
				await itemInfoService.addItemInfoWithItem(created.id, item)
			})
			return {
				message: "Продукт и информация к нему были созданы.",
				item: created,
				info: information,
			}
		}
		return { message: "Продукт был создан.", item: created }
	}

	async getAllItems(
		category?: string,
		brand?: string,
		available?: string,
		priceFrom?: string,
		priceTo?: string,
		page?: number,
		sort?: string
	) {
		const takeNum = 15
		const skipNum = page! > 0 ? (page! - 1) * takeNum : 0
		const categoryArr = Array.from(new Set(category?.split(",")))
		const brandArr = Array.from(new Set(brand?.split(",")))
		const items = await prisma.item.findMany({
			where: {
				...(category && { category: { name: { in: categoryArr } } }),
				...(brand && { brand: { name: { in: brandArr } } }),
				...(priceFrom &&
					priceTo && {
						price: { gte: Number(priceFrom), lte: Number(priceTo) },
					}),
				...((available === "В наличии" && {
					available: {
						gte: 1,
					},
				}) ||
					(available === "Отсутствуют" && {
						available: {
							equals: 0,
						},
					})),
			},
			skip: skipNum,
			take: takeNum,
			...((sort === "price" && {orderBy: {price: "asc"}}) || (sort === "name" && {orderBy: {name: "asc"}})),
		})
		if (!items) {
			throw SetError.NotFoundException("Не удалось получить список товаров.")
		}
		return {items}
	}

	async searchItems(word: string) {
		if (!word) return
		const items = await prisma.item.findMany({
			where: {
				name: {
					contains: word,
					mode: "insensitive",
				},
			},
			select: {
				id: true,
				name: true,
				image: true,
			},
		})
		if (!items) {
			return SetError.NotFoundException("Товары не найдены.")
		}
		return items
	}

	async getOneItem(itemId: number) {
		const item = await prisma.item.findUnique({
			where: {
				id: itemId,
			},
			include: {
				ItemInfo: true,
				UserComments: {
					include: { User: { select: { id: true, username: true } } },
				},
				brand: true,
				category: true,
			},
		})
		if (!item) {
			throw SetError.NotFoundException("Товар не найден.")
		}
		return item
	}

	async deleteOneItem(itemId: number) {
		if (!itemId) {
			throw SetError.BadRequestException("Item ID is required.")
		}
		const deleteInfo = await itemInfoService.deleteManyWithItem(itemId)
		const deleteComm = await userCommentsService.deleteManyWithItem(itemId)
		await cartItemService.deleteItemFromAllCarts(itemId)
		if (!deleteInfo || !deleteComm) {
			throw SetError.NotFoundException("Не удалось удалить зависимости товара.")
		}
		const deletedItem = await prisma.item.delete({
			where: {
				id: itemId,
			},
		})
		deletedItem.image.map(image =>
			unlink(`./images/${image}`, err => {
				if (err) {
					console.log(err)
				}
			})
		)
		if (!deletedItem) {
			throw SetError.NotFoundException("Товар не найден.")
		}
		return { message: "Товар был успешно удален." }
	}
}

export default new ItemService()
