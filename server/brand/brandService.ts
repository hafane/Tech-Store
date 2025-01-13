import { Brand, PrismaClient } from "@prisma/client"
import { CreateBrandDTO } from "./dto/createBrandDTO"
import SetError from "../Errors/SetError"

const prisma = new PrismaClient()

type PromiseCreate = {
    message: string
}

class BrandService {
    async createBrand(dto: CreateBrandDTO): Promise<PromiseCreate> {
        await prisma.brand.create({
            data: {
                name: dto.name
            }
        })
        return {message: "Бренд был создан."} 
    }

    async getAllBrands(): Promise<Brand[]> {
        const brands = await prisma.brand.findMany()
        return brands
    }

    async changeBrand(brandId: number, dto: CreateBrandDTO) {
        const changed = await prisma.brand.update({
            where: {
                id: brandId
            },
            data: {
                name: dto.name
            }
        })
        if(!changed) {
            return SetError.BadRequestException("Не удалось изменить бренд.")
        }
        return {message: "Бренд был изменен."}
    }

    async deleteBrand(brandId: number) {
        if(!brandId) {
            throw SetError.BadRequestException("Вы не ввели ID бренда.")
        }
        const deleted = await prisma.brand.delete({
            where: {
                id: brandId
            }
        })
        if(!deleted) {
            throw SetError.BadRequestException("Не удалось удалить бренд. Перед удалением бренда следует удалить все товары связанные с ним.")
        }
        return {message: "Удалено."}
    }
}

export default new BrandService()