import { PrismaClient } from "@prisma/client"
import { CategoryAddDTO } from "./dto/CategoryAddDTO"
import SetError from "../Errors/SetError"

const prisma = new PrismaClient()

class CategoryService {
    async createCategory(dto: CategoryAddDTO) {
        await prisma.category.create({
            data: {
                name: dto.name
            }
        })
        return {message: "Категория была создана."}
    }

    async getAllCategories() {
        const categories = await prisma.category.findMany()
        return categories
    }

    async changeCategory(categoryId: number, dto: CategoryAddDTO) {
        const categories = await prisma.category.update({
            where: {
                id: categoryId
            },
            data: {
                name: dto.name
            }
        })
        if(!categories) {
            throw SetError.BadRequestException("Не удалось изменить категорию.")
        }
        return {message: "Категория была изменена."}
    }

    async deleteCategory(categoryId: number) {
        if(!categoryId) {
            throw SetError.BadRequestException("Вы не ввели ID категории.")
        }
        const deleted = await prisma.category.delete({
            where: {
                id: categoryId
            }
        })
        if(!deleted) {
            throw SetError.BadRequestException("Не удалось удалить категорию.")
        }
        return {message: "Категория была удалена."}
    }
}

export default new CategoryService()