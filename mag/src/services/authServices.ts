import { AxiosResponse } from "axios"
import { $authHost, $host } from "../api/instance"
import { AuthURL } from "./enums/URLEnum"
import { LoginResponse, LogoutResponse } from "./types/AuthTypes"


export const LoginApi = async (username: string, password: string): Promise<AxiosResponse<LoginResponse>> => {
    const data = await $host.post<LoginResponse>(AuthURL.LOGIN, { username, password })
    localStorage.setItem("token", data.data.accessToken)
    return data
}

export const RegistrationApi = async (username: string, email: string, password: string): Promise<AxiosResponse<LoginResponse>> => {
    const data = await $host.post<LoginResponse>(AuthURL.REGISTER, { username, email, password })
    localStorage.setItem("token", data.data.accessToken)
    return data
}

export const LogoutApi = async (): Promise<AxiosResponse<LogoutResponse>> => {
    const data = await $host.post<LogoutResponse>(AuthURL.LOGOUT)
    localStorage.removeItem("token")
    return data
}

export const RefreshApi = async (): Promise<AxiosResponse<LoginResponse>> => {
    const data = await $authHost.get<LoginResponse>(AuthURL.REFRESH)
    localStorage.setItem("token", data.data.accessToken)
    return data
}