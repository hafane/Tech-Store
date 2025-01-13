import { AxiosResponse } from "axios"
import { $authHost, $host } from "../api/instance"
import { AuthURL } from "./enums/URLEnum"


export interface LoginResponse {
    accessToken: string,
    user: {
        id: number,
        username: string,
        email: string,
        activation: boolean,
    }
}


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

export const LogoutApi = async () => {
    const data = await $host.post(AuthURL.LOGOUT)
    localStorage.removeItem("token")
    return data
}

export const RefreshApi = async (): Promise<AxiosResponse<LoginResponse>> => {
    const data = await $authHost.get<LoginResponse>(AuthURL.REFRESH)
    localStorage.setItem("token", data.data.accessToken)
    return data
}