import { IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator"

type TResetPassword = {
    newPassword: string
    repeatPassword: string
}

export class ResetPasswordDTO {
    
    @IsString()
    @IsNotEmpty()
    newPassword

    @IsNotEmpty()
	@IsString()
	@MaxLength(24)
	@IsStrongPassword(
		{
			minLength: 8,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 1,
			minLowercase: 1,
		},
		{ message: "Пароль слишком простой." }
	)
    repeatPassword

    constructor(model: TResetPassword) {
        this.newPassword = model.newPassword
        this.repeatPassword = model.repeatPassword
    }
}