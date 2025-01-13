import {PrismaClient, Role} from '@prisma/client'
import jwt, {JwtPayload} from 'jsonwebtoken'
import SetError from "../Errors/SetError";

const prisma = new PrismaClient()

declare module "jsonwebtoken" {
    interface JwtPayload {
        id: number
        username: string
        email: string
        role: Role
    }
}

class TokenService {
    generateTokens(id: number, username: string, email: string, role: string) {
        const refreshToken = jwt.sign({id, username, email, role}, process.env.JWT_REFRESH_SECRET!, {
            expiresIn: "7d"
        })
        const accessToken = jwt.sign({id, username, email, role}, process.env.JWT_ACCESS_SECRET!, {
            expiresIn: "15m"
        })

        return {
            accessToken,
            refreshToken
        }
    }

    validateRefresh(token: string) {
        try {
            const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET!)
            return user
        } catch (e) {
            return null
        }
    }

    validateAccess(token: string) {
        try {
            const user = <JwtPayload>jwt.verify(token, process.env.JWT_ACCESS_SECRET!)
            return user
        } catch (e) {
            return null
        }
    }

    async saveToken(refreshToken: string, userId: number) {
        const checkToken = await prisma.token.findFirst({
            where: {
                userId: userId,
            }
        })
        if (checkToken) {
            return prisma.token.update({
                where: {
                    id: checkToken.id,
                },
                data: {
                    refreshToken: refreshToken
                }
            });
        }
        return prisma.token.create({
            data: {
                userId: userId,
                refreshToken: refreshToken
            }
        });
    }

    async deleteToken(token: string) {
        const del = await prisma.token.deleteMany({
            where: {
                refreshToken: token
            }
        })
        if (!del) {
            throw SetError.BadRequestException("Ошибка при удалении токена")
        }
        return {message: "Выход выполнен."}
    }

    async findToken(token: string) {
        const foundToken = await prisma.token.findFirst({
            where: {
                refreshToken: token,
            }
        })
        return foundToken;
    }
}

export default new TokenService()