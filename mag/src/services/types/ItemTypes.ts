import { TBrandList } from "../../store/brandStore"
import { TCategory } from "../categoryServices"

export type IFetchedItem = {
	items: IFetchedItemBrand[]
	allCount: number
}

export type IGetAllItems = {
	id: number
	name: string
	categoryId: number
	image: string[]
	brandId: number
	price: number
	available: number
}

export type IFetchedItemBrand = {
	id: number
	name: string
	categoryId: number
	image: string[]
	brandId: number
	price: number
	available: number
	brand: TBrandList
}

export type IFetchedOneItem = {
	id: number
	name: string
	categoryId: number
	image: string[]
	brandId: number
	price: number
	available: number
	brand: TBrandList
	category: TCategory
}

export interface TFetchedOneItem extends IFetchedOneItem {
	ItemInfo: {
		id: number
		itemId: number
		title: string
		description: string
	}[]
	UserComments: ({
		User: {
			id: number
			username: string
		}
	} & {
		id: number
		itemId: number
		title: string
		userId: number
		content: string
	})[]
	brand: TBrandList
	category: TCategory
}
