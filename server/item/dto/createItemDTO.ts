import {
	IsArray,
	IsNotEmpty,
	IsNumber,
	IsString,
	MaxLength,
    ValidateNested,
} from "class-validator"


type TCreateItemDTO = {
	name: string
	categoryId: number
	brandId: number
	price: number
	info: string
	available: number
}

type TCreateInfo = {
	title: string
	description: string
}

export class ItemInfoDTO {
	@MaxLength(35)
	@IsString()
	@IsNotEmpty()
	title

	@MaxLength(65)
	@IsString()
	@IsNotEmpty()
	description

    constructor(model: TCreateInfo) {
        this.title = model.title
        this.description = model.description
    }
}

export class CreateItemDTO {
	@IsString()
	@IsNotEmpty()
	name

	@IsNumber()
	@IsNotEmpty()
	categoryId

	@IsNumber()
	@IsNotEmpty()
	brandId

	@IsNumber()
	@IsNotEmpty()
	price

	@IsNumber()
	@IsNotEmpty()
	available

    @IsArray()
    @ValidateNested({ each: true })
	@IsNotEmpty()
	info: ItemInfoDTO[]

	constructor(model: TCreateItemDTO) {
		this.name = model.name
		this.categoryId = Number(model.categoryId)
		this.brandId = Number(model.brandId)
		this.price = Number(model.price)
		this.available = Number(model.available)
		this.info = JSON.parse(model.info).map((item: TCreateInfo) => new ItemInfoDTO(item))
	}
}