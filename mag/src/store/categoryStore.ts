import { makeAutoObservable } from "mobx"
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
        } catch (error: Error | any) {
           return console.log(error.response.data.message)
        }
    }

    createOneCategory = async (name: string) => {
        try {
            const cat = await createCategory(name)
            toast.success(cat.data.message)
            return this.fetchList()
        } catch (error: Error | any) {
            toast.error("Произошла ошибка при создании категории")
            return console.log(error.response.data.message)
        }
    }

    changeOneCategory = async (id: number, name: string) => {
        try {
            const cat = await changeCategory(id, name)
            toast.success(cat.data.message)
            return this.fetchList()
        } catch (error: Error | any) {
            toast.error("Произошла ошибка при изменении категории")
            return console.log(error.response.data.message)
        }
    }

    deleteOneCategory = async (id: number) => {
        try {
            const deleted = await deleteCategory(id)
            toast.success(deleted.data.message)
            return this.fetchList()
        } catch (error: Error | any) {
            toast.error("Произошла ошибка при удалении категории")
            return console.log(error.response.data.message)
        }
    }
    
}

export const Category = new CategoryStore()