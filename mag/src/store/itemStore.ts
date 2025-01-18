import { makeAutoObservable } from "mobx"
import { AxiosError } from "axios"
import { FetchItemApi, ISearchItem, SearchItemsApi, getOneItem, IGetAllItems, TFetchedOneItem } from "../services"

class ItemStore {
    listItems = [] as IGetAllItems[]
    listItemsCount = 15 as number
    searchedItems = [] as ISearchItem[]
    oneItem = {} as TFetchedOneItem

    constructor() {
        makeAutoObservable(this)
    }

    private setItems = (list: IGetAllItems[]) => {
        return this.listItems = list
    }

    setSearchedItems = (searched: ISearchItem[]) => {
        return this.searchedItems = searched
    }

    private setItem = (item: TFetchedOneItem) => {
        return this.oneItem = item
    }

    private setCount = (count: number) => {
        return this.listItemsCount = count
    }

    fetchItems = async (page: number, category?: string, brand?: string, available?: string, priceFrom?: number, priceTo?: number, sort?: string) => {
        try {
            const items = await FetchItemApi(category, brand, available, priceFrom, priceTo, page, sort)
            this.setItems(items.data.items)
            items.data.items.length >= 14 && this.setCount(items.data.items.length)
            return true
        } catch (error) {
            if(error instanceof AxiosError) {
				console.log(error.response?.data.message)
			} else {
				console.log("Произошла ошибка при получении каталога товаров.")
			}
        }
    }

    SearchItems = async (word: string) => {
        try {
            const items = await SearchItemsApi(word)
            this.setSearchedItems(items.data)
            return 
        } catch (error) {
            if(error instanceof AxiosError) {
				console.log(error.response?.data.message)
			} else {
				console.log("Произошла ошибка во время поиска товаров.")
			}
        }
    }

    fetchOneItem = async (id: string) => {
        try {
            const item = await getOneItem(Number(id))
            this.setItem(item.data)
            return true
        } catch (error) {
            if(error instanceof AxiosError) {
				console.log(error.response?.data.message)
			} else {
				console.log("Произошла ошибка при получении данных о товаре.")
			}
        }
    }
}

export const Item = new ItemStore()