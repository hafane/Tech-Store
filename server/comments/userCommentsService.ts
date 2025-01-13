import { PrismaClient } from "@prisma/client"
import { CreateCommDTO } from "./dto/createCommDTO"
import SetError from "../Errors/SetError"
import { DeleteCommDTO } from "./dto/deleteCommDTO"

const prisma = new PrismaClient()

class UserCommentsService {
    async addComment(userId: number, itemId: number, dto: CreateCommDTO) {
        const commentIsExist = await prisma.userComments.findFirst({
            where: {
                userId: userId,
                itemId: itemId
            }
        })
        if(commentIsExist) {
            throw SetError.BadRequestException("Вы можете оставить только один отзыв к каждому предмету.")
        }
        await prisma.userComments.create({
            data: {
                userId: userId,
                itemId: itemId,
                title: dto.title,
                content: dto.content
            }
        })
        return {message: "Комментарий добавлен."}
    }

    async deleteComment(userId: number, itemId: number, dto: DeleteCommDTO) {
        const commentIsExist = await prisma.userComments.findUnique({
            where: {
                id: dto.commentId,
                itemId: itemId,
                userId: userId
            }
        })
        if(!commentIsExist) {
            throw SetError.NotFoundException("Комментарий не найден.")
        }
        await prisma.userComments.delete({
            where: {
                id: dto.commentId
            }
        })
        return {message: "Комментарий удален."}
    }

    async deleteManyWithItem(itemId: number) {
        if(!itemId) {
            throw SetError.BadRequestException("Item ID is required.")
        }
        return await prisma.userComments.deleteMany({
            where: {
                itemId: itemId
            }
        })
    }
}

export default new UserCommentsService()