interface IUserDTO {
    activation: boolean;
    id: number
    username: string
    email: string
}

export class UserDTO {
    activation
    id
    username
    email
    constructor(model: IUserDTO) {
        this.activation = model.activation
        this.id = model.id
        this.username = model.username
        this.email = model.email
    }
}