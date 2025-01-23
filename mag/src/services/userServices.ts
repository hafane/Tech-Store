import { AxiosResponse } from "axios"
import { $authHost } from "../api/instance"
import { UserURL } from "./enums/URLEnum"
import { UserActivateMessage, UserDataToken } from "./types/UserTypes"

export const ChangePersonal = async  (currentPassword: string, newEmail?: string, newUsername?: string, newPassword?: string): Promise<AxiosResponse<UserDataToken>> => {
    const data = await $authHost.patch<UserDataToken>(UserURL.CHANGE_PERSONAL, { newEmail, newUsername, newPassword, currentPassword })
    localStorage.setItem("token", data.data.accessToken)
    return data
}

export const CreateActivateLink = async (): Promise<AxiosResponse<UserActivateMessage>> => {
    const data = await $authHost.post<UserActivateMessage>(UserURL.CREATE_ACTIVATE)
    return data
}