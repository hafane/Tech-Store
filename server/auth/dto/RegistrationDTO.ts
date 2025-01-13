import {
	IsEmail,
	IsNotEmpty,
	IsString,
	IsStrongPassword,
	MaxLength,
} from "class-validator"

type TRegDTO = {
	username: string
	email: string
	password: string
}

export class RegistrationDTO {
	@IsString()
	@MaxLength(18, {
		message: "Максимальная длина логина $constraints1 символа.",
	})
	@IsNotEmpty()
	username

	@IsEmail({}, { message: "Некорректная почта." })
	@IsNotEmpty()
	email

	@IsString()
	@MaxLength(24, {
		message: "Максимальная длина пароля $constraints1 символа.",
	})
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
	@IsNotEmpty()
	password

	constructor(model: TRegDTO) {
		this.username = model.username
		this.email = model.email
		this.password = model.password
	}
}
