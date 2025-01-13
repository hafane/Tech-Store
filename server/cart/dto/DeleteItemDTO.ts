import { IsNotEmpty, IsNumber } from "class-validator"

type TDeleteItemDTO = {
    itemId: number
}

export class DeleteItemDTO {

    @IsNumber()
    @IsNotEmpty()
    itemId;
    
    constructor(model: TDeleteItemDTO) {
        this.itemId = model.itemId
    }
}