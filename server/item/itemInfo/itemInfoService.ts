import { PrismaClient } from "@prisma/client"
import SetError from "../../Errors/SetError"
import { ItemInfoDTO } from "../dto/createItemDTO"

const prisma = new PrismaClient()

class ItemInfoService {
    async addItemInfoWithItem(itemId: number, dto: ItemInfoDTO) {
        await prisma.itemInfo.createMany({
            data: {
                itemId: itemId,
                title: dto.title,
                description: dto.description
            }
        })
        return
    }

    async deleteManyWithItem(itemId: number) {
        if(!itemId) {
            throw SetError.BadRequestException("Item ID is required.")
        }
        return await prisma.itemInfo.deleteMany({
            where: {
                itemId: itemId
            }
        })
    }
}

export default new ItemInfoService()