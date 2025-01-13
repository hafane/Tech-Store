import { IsNotEmpty, IsString } from "class-validator"

type TCategoryAddDTO = {
    name: string
}

export class CategoryAddDTO {
    @IsString()
    @IsNotEmpty()
    name;

    constructor(model: TCategoryAddDTO) {
        this.name = model.name
    }
}