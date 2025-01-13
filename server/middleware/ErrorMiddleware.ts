import SetError from "../Errors/SetError"
import { NextFunction, Response, Request } from "express"

export default function (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.log(err.message)
	if (err instanceof SetError) {
		res.status(err.status).send({ message: err.message, errors: err.error })
	}
	res.status(500).send({ message: "Internal Server Error", errors: err })
}
