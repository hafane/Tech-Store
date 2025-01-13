import { IsMobilePhone, IsNotEmpty, IsPostalCode, IsString } from "class-validator"

type TCreateOrderDTO = {
    city: string
    phoneNumber: string
    postalCode: string
    address: string
    name: string
}

export class CreateOrderDTO {

    @IsString()
    @IsNotEmpty()
    city

    @IsString()
    @IsMobilePhone("ru-RU", {strictMode: true})
    @IsNotEmpty()
    phoneNumber

    @IsString()
    @IsPostalCode("RU")
    @IsNotEmpty()
    postalCode

    @IsString()
    @IsNotEmpty()
    address

    @IsString()
    @IsNotEmpty()
    name

    constructor(model: TCreateOrderDTO) {
        this.city = model.city
        this.phoneNumber = model.phoneNumber
        this.postalCode = model.postalCode
        this.address = model.address
        this.name = model.name
    }
}