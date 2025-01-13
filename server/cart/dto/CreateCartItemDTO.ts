import { IsNotEmpty, IsNumber } from "class-validator"

type TCreateModel = {
    itemId: number
}

export class CreateCartItemDTO {
    @IsNumber()
    @IsNotEmpty()
    itemId;

    constructor(model: TCreateModel) {
        this.itemId = model.itemId
    }
}