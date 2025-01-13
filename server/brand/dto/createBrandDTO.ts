import { IsNotEmpty, IsString } from "class-validator"

type TCreateBrandDTO = {
    name: string
}

export class CreateBrandDTO {
    @IsString()
    @IsNotEmpty()
    name;

    constructor(model: TCreateBrandDTO) {
        this.name = model.name
    }
}