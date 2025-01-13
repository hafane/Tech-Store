import { useSearchParams } from "react-router-dom"
import { useEffect, useRef } from "react"
import { Filters } from "./useFilter"
import queryString from "query-string"

export const useSearchQuery = (
	filters: Filters,
) => {
	const ref = useRef<string | null>(null)
	const [_, setSearchParams] = useSearchParams()

	useEffect(() => {
		const params = {
			...filters.state.prices,
			category: filters.state.category,
			brand: Array.from(filters.state.brands),
			available: Array.from(filters.state.available),
			page: filters.state.page > 1 ? filters.state.page : undefined,
			sort: filters.state.sort
		}

		const query = queryString.stringify(params, {
			arrayFormat: "comma",
		})

		if (ref.current !== query) {
			ref.current = query
			setSearchParams(query, { preventScrollReset: true })
		}
	}, [filters])
}
