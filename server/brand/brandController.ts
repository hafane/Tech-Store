import { NextFunction, Response, Request } from "express"
import { CreateBrandDTO } from "./dto/createBrandDTO"
import { DTOValidation } from "../utils/DTOValidation"
import BrandService from "./brandService"

class BrandController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const dto = new CreateBrandDTO(req.body)
			await DTOValidation(dto, "Произошла ошибка при валидации данных.")
			const createdBrand = await BrandService.createBrand(dto)
			res.status(201).json(createdBrand)
		} catch (error) {
			next(error)
		}
	}

    async getBrands(req: Request, res: Response, next: NextFunction) {
        try {
            const brands = await BrandService.getAllBrands()
            res.status(200).json(brands)
        } catch (error) {
            next(error)
        }
    }

	async change(req: Request, res: Response, next: NextFunction) {
		try {
			const { brandId } = req.params
			const dto = new CreateBrandDTO(req.body)
			await DTOValidation(dto, "Произошла ошибка при валидации данных.")
			const changedBrand = await BrandService.changeBrand(+brandId, dto)
			res.status(200).json(changedBrand)
		} catch (error) {
			next(error)
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const {brandId} = req.params
			const deleted = await BrandService.deleteBrand(+brandId)
			res.status(200).json(deleted)
		} catch (error) {
			next(error)
		}
	}
}

export default new BrandController()
