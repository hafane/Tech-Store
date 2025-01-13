import { IsNotEmpty, IsString, MaxLength } from "class-validator"

type TCreateCommDTO = {
    title: string
    content: string
}

export class CreateCommDTO {
    @MaxLength(50)
    @IsString()
    @IsNotEmpty()
    title;

    @MaxLength(1550)
    @IsString()
    @IsNotEmpty()
    content;

    constructor(model: TCreateCommDTO) {
        this.title = model.title
        this.content = model.content
    }
}