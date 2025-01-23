import { AxiosResponse } from "axios"
import { $authHost, $host } from "../api/instance"
import { CategoryURL } from "./enums/URLEnum"
import { CategoryMessage } from "./types/CategoryTypes"

export type TCategory = {
    id: number
    name: string
}

export const FetchCategoryApi = async (): Promise<AxiosResponse<TCategory[]>> => {
    const data = await $host.get<TCategory[]>(CategoryURL.LIST)
    return data
}

export const createCategory = async (name: string): Promise<AxiosResponse<CategoryMessage>> => {
    const data = await $authHost.post<CategoryMessage>(CategoryURL.CREATE, { name })
    return data
}

export const changeCategory = async (categoryId: number,  name: string): Promise<AxiosResponse<CategoryMessage>> => {
    const data = await $authHost.patch<CategoryMessage>(CategoryURL.CHANGE + categoryId, { name })
    return data
}

export const deleteCategory = async (categoryId: number): Promise<AxiosResponse<CategoryMessage>> => {
    const data = await $authHost.delete<CategoryMessage>(CategoryURL.DELETE + categoryId)
    return data
}