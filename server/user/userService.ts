import {PrismaClient} from "@prisma/client"
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import { ChangePersonalDTO } from "./dto/changePersonalDTO"
import {createTokensAndGetUser, IPromise} from "../utils/createTokensAndGetUser";
import MailService from "../mail/mailService";
import SetError from "../Errors/SetError";
import ActivationService from "../activation/activationService";

const prisma = new PrismaClient();

class UserService {
    async getUsers() {
        const users = await prisma.user.findMany({
            include: {
                UserComments: true, Order: true, Cart: true
            }
        })
        return {...users}
    }

    async changePersonal(userId: number, dto: ChangePersonalDTO): Promise<IPromise> {
        const candidate = await prisma.user.findFirst({
            where: {
                OR: [{email: dto.newEmail}, {username: dto.newUsername}, {id: userId}],
            }
        })
        if(candidate) {
            if(candidate.username === dto.newUsername) {
                throw SetError.BadRequestException("Вводимый вами Username уже используется.")
            }
            if(candidate.email === dto.newEmail) {
                throw SetError.BadRequestException("Вводимый вами Email уже используется.")
            }
        }
        const correctedPassword = bcrypt.compareSync(dto.currentPassword, candidate!.password)
        if(!correctedPassword) {
            throw SetError.BadRequestException("Неверный пароль.")
        }
        const hashedPassword = dto.newPassword ? await bcrypt.hash(dto.newPassword, 5) : ""
        const userUpdate = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ...(dto.newEmail && { email: dto.newEmail }),
                ...(dto.newUsername && {username: dto.newUsername}),
                ...(dto.newPassword && { password: hashedPassword}),
            }
        })
        await MailService.sendChangePersonalMail(candidate!.email)
        const tokensAndUser = await createTokensAndGetUser(userUpdate)
        return {refreshToken: tokensAndUser.refreshToken, accessToken: tokensAndUser.accessToken, user: tokensAndUser.user };
    }

    async createActivateLink(userId: number, username: string) {
        const createLink = `${username}${uuidv4()}`
        const createdLink = await ActivationService.createLink(userId, createLink)
        await MailService.sendActivationMail(createdLink.User.email, createdLink.link)
        return {message: "Ссылка была создана и отправлена на вашу почту."}
    }

    async activate(link: string) {
        if(!link) {
            throw SetError.BadRequestException("Вы не ввели ссылку для активации.")
        }
        const foundUser = await ActivationService.findLink(link)
        if (!foundUser) {
            throw SetError.BadRequestException("Некорректная ссылка для активации.")
        }
        await prisma.user.update({
            where: {
                id: foundUser.userId
            },
            data: {
                activation: true
            }
        })
        await ActivationService.deleteLinkFromBase(foundUser.id)
        return {message: "Почта была успешно подтверждена."}
    }

    async setUserAsAdmin(userId: number) {
        const setRole = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role: "ADMIN"
            }
        })
        if(!setRole) {
            throw SetError.BadRequestException("Не удалось установить роль администратора.")
        }
        return {message: "Роль администратора была установлена."}
    }
}

export default new UserService();