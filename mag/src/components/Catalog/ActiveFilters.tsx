import { useSearchParams } from "react-router-dom"

const ActiveFilters = () => {
	const [searchParams, _] = useSearchParams()
    const array = [...searchParams.get("brand")?.split(",") || [], ...searchParams.get("available")?.split(",") || [], ...searchParams.get("category")?.split(",") || [], ...searchParams.get("priceFrom")?.split(",") || [], ...searchParams.get("priceTo")?.split(",") || []]

	return (
		<div>
			<div className="flex mb-8 gap-4 overflow-auto">
				{array.map(item => (
					<div
						key={item}
						className="min-w-32 items-center px-1 py-2 text-center border border-neutral-600 rounded-lg"
					>
						{item}
					</div>
				))}
			</div>
		</div>
	)
}

export default ActiveFilters
