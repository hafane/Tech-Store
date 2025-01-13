import { IFetchedItemBrand } from "./ItemTypes"

export type TCartAndMassage = {
	message?: string
	cart: TCartType
}

export type TCartType = {
	id: number
	userId: number
	totalAmount: number
	CartItem: TCartItemType[]
}

type TCartItemType = {
	id: number
	itemId: number
	cartId: number
	quantity: number
    Item: IFetchedItemBrand
}