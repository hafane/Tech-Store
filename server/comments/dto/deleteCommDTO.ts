import { IsNotEmpty, IsNumber } from "class-validator"

type TDeleteCommDTO = {
    commentId: number
}

export class DeleteCommDTO {
    @IsNumber()
    @IsNotEmpty()
    commentId;

    constructor(model: TDeleteCommDTO) {
        this.commentId = model.commentId
    }
}