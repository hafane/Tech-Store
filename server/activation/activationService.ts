import {PrismaClient} from "@prisma/client"
import SetError from "../Errors/SetError";

const prisma = new PrismaClient()

class ActivationService {
    async createLink(userId: number, link: string) {
        const create = await prisma.activation.create({
            data: {
                userId: userId,
                link: link,
            },
            include: {
                User: true
            }
        })
        return create
    }

    async findLink(link: string) {
        if(!link) {
            throw SetError.BadRequestException("Вы не ввели ссылку для активации.")
        }
        const foundLink = await prisma.activation.findFirst({
            where: {
                link: link
            }
        })
        if(!foundLink) {
            throw SetError.NotFoundException("Ссылка не найдена.")
        }
        return foundLink
    }

    async deleteLinkFromBase(id: number) {
        if(!id) {
            throw SetError.BadRequestException("Вы не ввели id для удаления.")
        }
        const deleted = await prisma.activation.delete({
            where: {
                id: id
            }
        })
        if(!deleted) {
            throw SetError.BadRequestException("Возникла проблема при удалении ссылки из базы.")
        }
        return {message: "Ссылка успешно удалена."}
    }
}

export default new ActivationService()