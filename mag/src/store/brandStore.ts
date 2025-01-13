import { makeAutoObservable } from "mobx"
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
		} catch (error: Error | any) {
			return console.log(error.response.data.message)
		}
	}

	changeBrand = async (id: number, name: string) => {
		try {
			const newBrand = await changeBrand(id, name)
			toast.success(newBrand.data.message)
			return this.fetchAllBrands()
		} catch (error) {
			return console.log(error)
		}
	}

	createNewBrand = async (name: string) => {
		try {
			const newBrand = await createBrand(name)
			toast.success(newBrand.data.message)
			return this.fetchAllBrands()
		} catch (error) {
			return console.log(error)
		}
	}

	deleteOneBrand = async (id: number) => {
		try {
			const deleted = await deleteBrand(id)
			toast.success(deleted.data.message)
			return this.fetchAllBrands()
		} catch (error: Error | any) {
			toast.error(error.response.data.message)
			return console.log(error)
		}
	}
}


export const Brand = new BrandStore()