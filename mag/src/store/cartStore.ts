import { makeAutoObservable } from "mobx"
import { AxiosError } from "axios"
import { addItemToCart, deleteCartItem, getCart, updateQuantity, TCartType } from "../services"
import toast from "react-hot-toast"

class CartStore {
    userCart = {} as TCartType
    cartLength = 0 as number

    constructor() {
        makeAutoObservable(this)
    }

    private setCart = (cart: TCartType) => {
        return this.userCart = cart
    }

    private setCartLength = (length: number) => {
        return this.cartLength = length
    }

    fetchUserCart = async () => {
        try {
            const items = await getCart()
            this.setCart(items.data)
            this.setCartLength(items.data.CartItem.length)
            return true
        } catch (error) {
            if(error instanceof AxiosError) {
				console.log(error.response?.data.message)
			} else {
				console.log("Произошла ошибка во время получения корзины пользователя.")
			}
            return null
        }
    }

    setItemCart = async (itemId: number) => {
        try {
            const item = await addItemToCart(itemId)
            this.setCart(item.data.cart)
            this.setCartLength(item.data.cart.CartItem.length)
            return toast.success("Товар успешно добавлен в корзину.")
        } catch (error) {
            if(error instanceof AxiosError) {
				toast.error(error.response?.data.message)
			} else {
				toast.error("Произошла ошибка при добавлении товара в корзину.")
			}
        }
    }

    updateItemQuantity = async (itemId: number, quantity: number) => {
        try {
            const updatedCart = await updateQuantity(itemId, quantity)
            this.setCart(updatedCart.data.cart)
            this.setCartLength(updatedCart.data.cart.CartItem.length)
            return
        } catch (error) {
            if(error instanceof AxiosError) {
				toast.error(error.response?.data.message)
			} else {
				toast.error("Произошла ошибка при изменении количества товара в корзине.")
			}
        }
    }

    deleteItemFromCart = async (itemId: number) => {
        try {
            const updatedCart = await deleteCartItem(itemId)
            this.setCart(updatedCart.data.cart)
            this.setCartLength(updatedCart.data.cart.CartItem.length)
            return toast.success("Товар успешно удален из корзины.")
        } catch (error) {
            if(error instanceof AxiosError) {
				toast.error(error.response?.data.message)
			} else {
				toast.error("Произошла ошибка при удалении товара из корзины.")
			}
        }
    }
}

export const Cart = new CartStore()