import { makeAutoObservable } from "mobx"
import { AxiosError } from "axios"
import { FetchCategoryApi, changeCategory, createCategory, deleteCategory, TCategory } from "../services"
import toast from "react-hot-toast"

class CategoryStore {
    list = [] as TCategory[]

    constructor() {
        makeAutoObservable(this)
    }

    private setList(list: TCategory[]) {
        return this.list = list
    }

    fetchList = async () => {
        try {
           const _list = await FetchCategoryApi()
           this.setList(_list.data)
        } catch (error) {
            if(error instanceof AxiosError) {
				console.log(error.response?.data.message)
			} else {
				console.log("Произошла ошибка во время получения категорий.")
			}
        }
    }

    createOneCategory = async (name: string) => {
        try {
            const cat = await createCategory(name)
            toast.success(cat.data.message)
            return this.fetchList()
        } catch (error) {
            if(error instanceof AxiosError) {
				toast.error(error.response?.data.message)
			} else {
				toast.error("Произошла ошибка во время создания категории.")
			}
        }
    }

    changeOneCategory = async (id: number, name: string) => {
        try {
            const cat = await changeCategory(id, name)
            toast.success(cat.data.message)
            return this.fetchList()
        } catch (error) {
            if(error instanceof AxiosError) {
				toast.error(error.response?.data.message)
			} else {
				toast.error("Произошла ошибка во время изменения категории.")
			}
        }
    }

    deleteOneCategory = async (id: number) => {
        try {
            const deleted = await deleteCategory(id)
            toast.success(deleted.data.message)
            return this.fetchList()
        } catch (error) {
            if(error instanceof AxiosError) {
				toast.error(error.response?.data.message)
			} else {
				toast.error("Произошла ошибка во время удаления категории.")
			}
        }
    }
    
}

export const Category = new CategoryStore()