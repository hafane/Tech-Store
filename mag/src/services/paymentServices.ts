import { AxiosResponse } from "axios"
import { $authHost } from "../api/instance"
import { PaymentData } from "./types/paymentTypes"

export const paymentCallback = async (): Promise<AxiosResponse<PaymentData>> => {
    const data = await $authHost.post<PaymentData>("/checkout")
    return data
}