import { makeAutoObservable } from "mobx"
import { AxiosError } from "axios"
import { AllBrandsApi, changeBrand, createBrand, deleteBrand } from "../services"
import toast from "react-hot-toast"

export type TBrandList = {
	id: number
	name: string
}

class BrandStore {
	brandList = [] as TBrandList[]

	constructor() {
		makeAutoObservable(this)
	}

	private setBrandList = (list: TBrandList[]) => {
		return (this.brandList = list)
	}

	fetchAllBrands = async () => {
		try {
			const list = await AllBrandsApi()
			this.setBrandList(list.data)
			return
		} catch (error) {
			if(error instanceof AxiosError) {
				console.log(error.response?.data.message)
			} else {
				console.log("Произошла ошибка во время получения всех брендов.")
			}
		}
	}

	changeBrand = async (id: number, name: string) => {
		try {
			const newBrand = await changeBrand(id, name)
			toast.success(newBrand.data.message)
			return this.fetchAllBrands()
		} catch (error) {
			if(error instanceof AxiosError) {
				toast.error(error.response?.data.message)
			} else {
				toast.error("Произошла ошибка при изменении информации о бренде.")
			}
		}
	}

	createNewBrand = async (name: string) => {
		try {
			const newBrand = await createBrand(name)
			toast.success(newBrand.data.message)
			return this.fetchAllBrands()
		} catch (error) {
			if(error instanceof AxiosError) {
				toast.error(error.response?.data.message)
			} else {
				toast.error("Произошла ошибка при добавлении нового бренда.")
			}
		}
	}

	deleteOneBrand = async (id: number) => {
		try {
			const deleted = await deleteBrand(id)
			toast.success(deleted.data.message)
			return this.fetchAllBrands()
		} catch (error) {
			if(error instanceof AxiosError) {
				toast.error(error.response?.data.message)
			} else {
				toast.error("Произошла ошибка при удалении бренда.")
			}
		}
	}
}


export const Brand = new BrandStore()