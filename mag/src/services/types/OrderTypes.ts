export type IOrder = {
	id: number
	userId: number
	totalAmount: number
	status: "PENDING" | "SUCCESS" | "CANCELED"
	paymentId?: string
	items: string
	city: string
	phoneNumber: string
	postalCode: string
	address: string
	name: string
	createAt: number
}

export type orderItemList = {
	Item: {
		id: number
		name: string
		image: string[]
	}
	quantity: number
}

export type TOrderMessage = {
	url: string
}

export type TCreateOrder = {
	paymentId?: string
	city: string
	phoneNumber: string
	postalCode: string
	address: string
	name: string
}
