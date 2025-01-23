export type User = {
    id: number
    activation: boolean
    username: string
    email: string
} 

export type UserDataToken = {
    accessToken: string
    user: User
}

export type UserActivateMessage = {
    message: string
}