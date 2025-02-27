import { AxiosResponse } from "axios"
import { $authHost, $host } from "../api/instance"
import { UserURL } from "./enums/URLEnum"
import { UserActivateMessage, UserCreateResetResponse, UserDataToken, UserResetPasswordResponse } from "./types/UserTypes"

export const ChangePersonal = async  (currentPassword: string, newEmail?: string, newUsername?: string, newPassword?: string): Promise<AxiosResponse<UserDataToken>> => {
    const data = await $authHost.patch<UserDataToken>(UserURL.CHANGE_PERSONAL, { newEmail, newUsername, newPassword, currentPassword })
    localStorage.setItem("token", data.data.accessToken)
    return data
}

export const CreateActivateLink = async (): Promise<AxiosResponse<UserActivateMessage>> => {
    const data = await $authHost.post<UserActivateMessage>(UserURL.CREATE_ACTIVATE)
    return data
}

export const CreateResetLink = async (email: string): Promise<AxiosResponse<UserCreateResetResponse>> => {
    const data = await $host.post<UserCreateResetResponse>(UserURL.CREATE_RESET, { email })
    return data
}

export const ResetPassword = async (token: string, newPassword: string, repeatPassword: string): Promise<AxiosResponse<UserResetPasswordResponse>> => {
    const data = await $host.post<UserResetPasswordResponse>(UserURL.RESET_PASSWORD + token, { newPassword, repeatPassword })
    return data
}

export const checkToken = async (token: string): Promise<AxiosResponse<UserResetPasswordResponse>> => {
    const data = await $host.get<UserResetPasswordResponse>(UserURL.RESET_PASSWORD + token)
    return data
}