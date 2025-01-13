import { IsNotEmpty, IsNumber } from "class-validator"

type TUpdateItemQuantity = {
    quantity: number
    itemId: number
}

export class UpdateItemQuantity {
    @IsNumber()
    @IsNotEmpty()
    quantity

    @IsNumber()
    @IsNotEmpty()
    itemId;

    constructor(model: TUpdateItemQuantity) {
        this.quantity = model.quantity
        this.itemId = model.itemId
    }
}