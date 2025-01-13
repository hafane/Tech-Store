import { AxiosResponse } from "axios"
import { $authHost, $host } from "../api/instance"
import { TBrandList } from "../store/brandStore"
import { BrandURL } from "./enums/URLEnum"
import { BrandMessage } from "./types/BrandTypes"

export const AllBrandsApi = async (): Promise<AxiosResponse<TBrandList[]>> => {
    const data = await $host.get<TBrandList[]>(BrandURL.LIST)
    return data
}

export const changeBrand = async (id: number, name: string): Promise<AxiosResponse<BrandMessage>> => {
    const data = await $authHost.patch<BrandMessage>(BrandURL.CHANGE + id, {name})
    return data
}

export const createBrand = async (name: string): Promise<AxiosResponse<BrandMessage>> => {
    const data = await $authHost.post<BrandMessage>(BrandURL.CREATE, { name })
    return data
}

export const deleteBrand = async (brandId: number): Promise<AxiosResponse<BrandMessage>> => {
    const data = await $authHost.delete<BrandMessage>(BrandURL.DELETE + brandId)
    return data
}