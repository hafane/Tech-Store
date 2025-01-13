import { AxiosResponse } from "axios"
import { $authHost } from "../api/instance"
import { CartURL } from "./enums/URLEnum"
import { TCartAndMassage, TCartType } from "./types/CartTypes"


export const getCart = async (): Promise<AxiosResponse<TCartType>> => {
    const data = await $authHost.get<TCartType>(CartURL.GET)
    return data
}

export const addItemToCart = async (itemId: number): Promise<AxiosResponse<TCartAndMassage>> => {
    const data = await $authHost.post<TCartAndMassage>(CartURL.CREATE, { itemId })
    return data
}

export const updateQuantity = async (itemId: number, quantity: number): Promise<AxiosResponse<TCartAndMassage>> => {
    const data = await $authHost.patch<TCartAndMassage>(CartURL.UPDATE, { itemId, quantity })
    return data
}

export const deleteCartItem = async (itemId: number): Promise<AxiosResponse<TCartAndMassage>> => {
    const data = await $authHost.delete<TCartAndMassage>(CartURL.DELETE, { data: { itemId } })
    return data
}