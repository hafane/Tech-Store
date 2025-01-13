import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsStrongPassword,
	MaxLength,
} from "class-validator"

type TChangeDTO = {
	newUsername?: string
	newEmail?: string
	newPassword?: string
	currentPassword: string
}

export class ChangePersonalDTO {
	@IsOptional()
	@IsString()
	@MaxLength(18, {
		message: "Максимальная длина логина $constraints1 символа.",
	})
	newUsername

	@IsOptional()
	@IsEmail({}, { message: "Некорректный формат почты." })
	newEmail

	@IsString()
	@IsNotEmpty()
	currentPassword

	@IsOptional()
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
	newPassword

	constructor(model: TChangeDTO) {
		this.newUsername = model.newUsername
		this.newEmail = model.newEmail
		this.newPassword = model.newPassword
		this.currentPassword = model.currentPassword
	}
}
