import { validate } from "class-validator"
import SetError from "../Errors/SetError"

export async function DTOValidation(dto: Object, message: string): Promise<boolean> {
	const errors = await validate(dto)
	console.log(errors)
	if (errors.length > 0) {
		throw SetError.BadRequestException(message, errors as [])
	}
    return true
}