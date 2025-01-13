import {PrismaClient} from "@prisma/client"
import bcrypt from "bcrypt";
import { LoginDTO } from "./dto/LoginDTO"
import { RegistrationDTO } from "./dto/RegistrationDTO"
import {createTokensAndGetUser, IPromise} from "../utils/createTokensAndGetUser";
import MailService from "../mail/mailService";
import SetError from "../Errors/SetError";
import TokenService from "../token/tokenService";
import CartService from "../cart/cartService"

const prisma = new PrismaClient();

class AuthService {
    async registration(dto: RegistrationDTO): Promise<IPromise> {
        const usernameExist = await prisma.user.findUnique({
            where: {
                username: dto.username,
            }
        })
        const emailExist = await prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        })
        if (usernameExist || emailExist) {
            throw SetError.BadRequestException(`Пользователь с почтой ${dto.email} или с никнеймом ${dto.username} уже существует`)
        }
        const hashedPassword = await bcrypt.hash(dto.password, 5)
        const user = await prisma.user.create({
            data: {
                username: dto.username,
                password: hashedPassword,
                email: dto.email,
                activation: false
            }
        })
        await CartService.createUserCart(user.id)
        await MailService.sendRegistrationMail(user.email, user.username, user.activation)
        const tokensAndUser = await createTokensAndGetUser(user)
        return {refreshToken: tokensAndUser.refreshToken, accessToken: tokensAndUser.accessToken, user: tokensAndUser.user };
    }

    async login(dto: LoginDTO): Promise<IPromise> {
        const checkUser = await prisma.user.findUnique({
            where: {
                username: dto.username,
            }
        })
        if(!checkUser) {
            throw SetError.BadRequestException("Данный пользователь не найден")
        }
        const passwordMatch = await bcrypt.compare(dto.password, checkUser.password);
        if (!passwordMatch) {
            throw SetError.BadRequestException("Неверный пароль")
        }
        const tokenAndUser = await createTokensAndGetUser(checkUser)
        return {refreshToken: tokenAndUser.refreshToken, accessToken: tokenAndUser.accessToken, user: tokenAndUser.user };
    }

    async logout(refreshToken: string): Promise<{message: string}> {
        const logoutResponse = await TokenService.deleteToken(refreshToken);
        return {...logoutResponse}
    }

    async refresh(refreshToken: string): Promise<IPromise> {
        if(!refreshToken) {
            throw SetError.UnauthorizedException()
        }
        const validatedToken = TokenService.validateRefresh(refreshToken)
        const tokenInBase = await TokenService.findToken(refreshToken)
        if(!validatedToken || !tokenInBase) {
            throw SetError.UnauthorizedException()
        }
        const user = await prisma.user.findUnique({
            where: {
                id: tokenInBase.userId
            }
        })
        const tokensAndUser = await createTokensAndGetUser(user!)
        return {refreshToken: tokensAndUser.refreshToken, accessToken: tokensAndUser.accessToken, user: tokensAndUser.user };
    }
}

export default new AuthService()