import { IsNotEmpty, IsString, Length, MaxLength } from "class-validator"

type TLoginDTO = {
    username: string
    password: string
}

export class LoginDTO {
    @IsString()
    @IsNotEmpty()
    username;

    @IsString()
    @IsNotEmpty()
    password;

    constructor(model: TLoginDTO) {
        this.username = model.username
        this.password = model.password
    }
}