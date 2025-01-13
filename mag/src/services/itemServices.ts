import { AxiosResponse } from "axios"
import { $authHost, $host } from "../api/instance"
import { ItemURL } from "./enums/URLEnum"
import { IFetchedItem, TFetchedOneItem } from "./types/ItemTypes"

export interface ISearchItem {
	id: number
	name: string
	image: string[]
}

interface messageReturn {
	message: string
}

export const FetchItemApi = async (
	category?: string,
	brand?: string,
	available?: string,
	priceFrom?: number,
	priceTo?: number,
	page?: number,
	sort?: string
): Promise<AxiosResponse<IFetchedItem>> => {
	const data = await $host.get<IFetchedItem>(ItemURL.LIST, {
		params: {
			category: category,
			brand: brand,
			available: available,
			priceFrom: priceFrom,
			priceTo: priceTo,
			page: page,
			sort: sort
		},
	})
	return data
}

export const SearchItemsApi = async (
	word: string
): Promise<AxiosResponse<ISearchItem[]>> => {
	const data = await $host.get<ISearchItem[]>(ItemURL.SEARCH, {
		params: { word },
	})
	return data
}

export const getOneItem = async (
	id: number
): Promise<AxiosResponse<TFetchedOneItem>> => {
	const data = await $host.get<TFetchedOneItem>(ItemURL.GET_ONE + id)
	return data
}

export const createItem = async (
	formdata: any
): Promise<AxiosResponse<TFetchedOneItem>> => {
	const data = await $authHost.post<TFetchedOneItem>(ItemURL.CREATE, formdata, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	})
	return data
}

export const deleteItem = async (
	itemId: number
): Promise<AxiosResponse<messageReturn>> => {
	const data = await $authHost.delete<messageReturn>(ItemURL.DELETE + itemId)
	return data
}
