import { useFilterContext } from "../../context/filterContext"
import { HiXMark } from "react-icons/hi2"

const ActiveFilters = () => {
	const {
		state: { available, brands, prices, category },
		change: {toggleBrand, setCategory, toggleAvailable, togglePrice}
	} = useFilterContext()

	const formattedArray = [
		...Array.from(brands).map(brand => ({type: "brand", value: brand})),
		...Array.from(available).map(available => ({type: "available", value: available})),
		prices.priceFrom ? {type: "priceFrom", value: prices.priceFrom} : undefined,
		prices.priceTo ? {type: "priceTo", value: prices.priceTo} : undefined,
		category ? {type: "category", value: category} : undefined,
	].filter(Boolean)

	const handleToggle = (item: {type: string, value: string | number | undefined}) => {
		switch (item.type) {
			case "brand": 
				toggleBrand(item.value as string)
				break;
			case "available": 
				toggleAvailable(item.value as string)
				break;
			case "priceFrom": 
				togglePrice("priceFrom", undefined)
				break;
			case "priceTo":
				togglePrice("priceTo", undefined)
				break;
			case "category": 
				setCategory(undefined)
				break;
			default:
				break;
		}
	}

	return (
		<div>
			<div className="flex mb-8 gap-4 overflow-auto">
				{formattedArray.map((item, index) => (
					<div
						key={`${item!.value} + ${index}`}
						className="min-w-32 flex items-center justify-between px-1 py-2 border border-neutral-600 rounded-lg"
					>
						{item!.type === "priceFrom" ? `От ${item!.value}` : item!.type === "priceTo" ? `До ${item!.value}` : item!.value}
						<HiXMark className="hover:text-blue-500 transition-colors cursor-pointer" onClick={() => handleToggle(item!)} size={20} />
					</div>
				))}
			</div>
		</div>
	)
}

export default ActiveFilters
