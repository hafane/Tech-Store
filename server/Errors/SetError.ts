export default class SetError extends Error {
    error
    status

    constructor(message: string, status: number, error: [] = []) {
        super(message);
        this.status = status;
        this.error = error;
    }

    static UnauthorizedException() {
        return new SetError("Пользователь не авторизован", 401)
    }

    static BadRequestException(message: string, error?: []) {
        return new SetError(message, 400, error)
    }

    static ForbiddenException(message?: string) {
        return new SetError(message || "В доступе отказано", 403)
    }

    static NotFoundException(message?: string) {
        return new SetError(message || "Не найдено", 404)
    }
}