import { useEffect } from "react"
import useDeviceDetect from "../hooks/useDeviceDetect"
import { useFilterContext } from "../context/filterContext"
import { useSearchQuery } from "../hooks/useSearchQuery"
import { observer } from "mobx-react-lite"
import { Item } from "../store/itemStore"
import {
	Header,
	Filter,
	ItemsSection,
	ActiveFilters,
} from "../components/Catalog"
import MobileFilter from "../components/Catalog/Filter/MobileFilter"
import Sort from "../components/Catalog/SortSection/Sort"

const Catalog = observer(() => {
	const filters = useFilterContext()
	const { available, brands, page, prices, category, sort } = filters.state
	useSearchQuery(filters)
	const { isMobile } = useDeviceDetect()

	useEffect(() => {
		async function fetchItems() {
			const { priceFrom, priceTo } = prices
			const brand = Array.from(brands).join(",")
			const avail = Array.from(available).join(",")

			await Item.fetchItems(
				page,
				category,
				brand,
				avail,
				priceFrom,
				priceTo,
				sort
			)
		}
		fetchItems()
	}, [available, brands, page, prices, category, sort])

	return (
		<div>
			<Header />
			<ActiveFilters />
			{isMobile && (
				<div className="flex justify-between items-center">
					<MobileFilter />
					<Sort />
				</div>
			)}
			<div className="block md:grid md:grid-cols-12 md:gap-5 items-start">
				{!isMobile && <Filter />}
				<ItemsSection />
			</div>
		</div>
	)
})

export default Catalog
