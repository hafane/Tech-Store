import { Role } from "@prisma/client"

interface ITokenDTO {
    username: string
    email: string
    id: number
    role: Role
}

export class TokenDTO {
    username
    email
    id
    role
    constructor(model: ITokenDTO) {
        this.username = model.username
        this.email = model.email
        this.id = model.id
        this.role = model.role
    }
}