import axios, { AxiosResponse } from "axios"
import { PaymentData } from "./types"

type props = {
    description: string
    amount: number
    orderId: number
}

export const createPayment = async (details: props) => {
    const data = await axios.post<PaymentData>("https://api.yookassa.ru/v3/payments", {
        amount: {
            value: details.amount,
            currency: "RUB"
        },
        capture: true,
        description: details.description,
        metadata: {
            order_id: details.orderId
        },
        confirmation: {
            type: "redirect",
            return_url: process.env.CONFIRM_REDIRECT
        },
    }, {
        auth: {
            username: process.env.YOOKASSA_SHOP_ID as string,
            password: process.env.YOOKASSA_API_KEY as string
        }, 
        headers: {
            "Idempotence-Key": Date.now() + Math.random().toString(36).substring(2), 
            "Content-Type": "application/json"
        }
    })
    return data
}