import { UserDTO } from "./localDto/UserDataDTO"
import TokenService from "../token/tokenService";

type UserParam = {
    id: number
    username: string
    email: string
    role: string
    activation: boolean
}

interface IUser {
    username: string
    email: string
    id: number
    activation: boolean
}

export interface IPromise {
    accessToken: string
    refreshToken: string
    user: IUser
}

export async function createTokensAndGetUser(user: UserParam): Promise<IPromise> {
    const UserDto = new UserDTO(user)
    const newToken = TokenService.generateTokens(
        user.id,
        user.username,
        user.email,
        user.role
    )
    await TokenService.saveToken(newToken.refreshToken, user.id)
    return {...newToken, user: UserDto}
}