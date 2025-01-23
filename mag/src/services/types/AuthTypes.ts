export type LoginResponse = {
    accessToken: string,
    user: {
        id: number,
        username: string,
        email: string,
        activation: boolean,
    }
}

export type LogoutResponse = {
    message: string
}