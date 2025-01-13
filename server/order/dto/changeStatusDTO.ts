import { OrderStatus } from "@prisma/client"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"

type TChangeStatusDTO = {
    status: OrderStatus
}

export class ChangeStatusDTO {
    @IsString()
    @IsEnum([OrderStatus])
    @IsNotEmpty()
    status

    constructor(model: TChangeStatusDTO) {
        this.status = model.status
    }
}