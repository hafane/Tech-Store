import { makeAutoObservable } from "mobx"
import { getAllOrders, getUserOrders, IOrder } from "../services"
import { TCreateOrder } from "../services/types/OrderTypes"
import { createOrder } from "../services/orderServices"
import toast from "react-hot-toast"

class OrderStore {
    ordersHistory: IOrder[] = []
    isLoading: boolean = false
    allOrders: IOrder[] = []

    constructor() {
        makeAutoObservable(this)
    }

    setOrdersHistory = (orders: IOrder[]) => {
        this.ordersHistory = orders
    }

    private setAllOrders = (orders: IOrder[]) => {
        this.allOrders = orders
    }

    fetchOrdersHistory = async (status: "PENDING" | "PROCESSED" | "CANCELLED") => {
        try {
            const data = await getUserOrders(status)
            this.setOrdersHistory(data.data)
        } catch (error: Error | any) {
            return console.log(error)
        }
    }

    fetchAllOrders = async (take: number) => {
        try {
            const data = await getAllOrders(take)
            this.setAllOrders(data.data)
        } catch (error: Error | any) {
            return console.log(error)
        }
    }

    createNewOrder = async (order: TCreateOrder) => {
        try {
            this.isLoading = true
            const d = await createOrder(order)
            toast.success("Заказ успешно создан. Перенаправление...")
            window.location.href = d.data.url as string 
        } catch (error) {
            toast.error("Произошла ошибка при создании заказа.")
            return console.log(error)
        } finally {
            this.isLoading = false
        }
    }
}

export const Order = new OrderStore()