import { AxiosResponse } from "axios"
import { $authHost } from "../api/instance"
import { OrderURL } from "./enums/URLEnum"
import { IOrder, TCreateOrder, TOrderMessage } from "./types/OrderTypes"

export const getUserOrders = async (status: "PENDING" | "PROCESSED" | "CANCELLED"): Promise<AxiosResponse<IOrder[]>> => {
    const data = await $authHost.get<IOrder[]>(OrderURL.GET_USER_ORDERS, {params: {status}})
    return data
}

export const getAllOrders = async (take: number): Promise<AxiosResponse<IOrder[]>> => {
    const data = await $authHost.get<IOrder[]>(OrderURL.GET_ALL_ORDERS, {params: {take}})
    return data
}

export const createOrder = async (order: TCreateOrder): Promise<AxiosResponse<TOrderMessage>> => {
    const data = await $authHost.post<TOrderMessage>(OrderURL.CREATE, order)
    return data
}