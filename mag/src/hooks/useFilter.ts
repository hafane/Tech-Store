import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useSet } from "react-use"

type PriceType = {
	priceFrom?: number
	priceTo?: number
}

export type Filters = {
	state: {
		brands: Set<string>
		available: Set<string>
		prices: PriceType
        category?: string
        page: number
		sort?: string
	}
}

interface ReturnType extends Filters {
	change: {
		toggleBrand: (brand: string) => void
		toggleAvailable: (available: string) => void
		togglePrice: (name: keyof PriceType, value: number) => void
		clearAll: () => void
        setCategory: (category: string) => void
        setPage: React.Dispatch<React.SetStateAction<number>>
		setSort: (sort: string) => void
	}
}

export const UseFilter = (): ReturnType => {
	const [searchParams, _] = useSearchParams()

	const [brands, { toggle: toggleBrand, clear: clearBrand }] = useSet(
		new Set<string>(
			searchParams.has("brand") ? searchParams.get("brand")?.split(",") : []
		)
	)

	const [available, { toggle: toggleAvailable, clear: clearAvailable }] =
		useSet(
			new Set<string>(
				searchParams.has("available")
					? searchParams.get("available")?.split(",")
					: []
			)
		)

	const [prices, setPrices] = useState<PriceType>({
		priceFrom: Number(searchParams.get("priceFrom")) || undefined,
		priceTo: Number(searchParams.get("priceTo")) || undefined,
	})

    const [category, setCategory] = useState<string | undefined>(searchParams.get("category") || undefined)

    const [page, setPage] = useState<number>(Number(searchParams.get("page")))

	const [sort, setSort] = useState<string | undefined>(searchParams.get("sort") || undefined)

	const clearAll = () => {
		clearBrand()
		clearAvailable()
		setCategory(undefined)
		setPrices({ priceFrom: undefined, priceTo: undefined })
	}

	const updatePrice = (name: keyof PriceType, value: number) => {
		setPrices(prev => ({ ...prev, [name]: value }))
	}

	return useMemo(
		() => ({
			state: {
				brands,
				available,
				prices,
                category,
                page,
				sort
			},
			change: {
				toggleBrand,
				toggleAvailable,
				togglePrice: updatePrice,
				clearAll,
                setCategory,
                setPage,
				setSort
			},
		}),
		[brands, available, prices, category, page, sort]
	)
}
