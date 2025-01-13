import { useEffect } from "react"
import { useFilterContext } from "../../context/filterContext"
import { observer } from "mobx-react-lite"
import { Brand } from "../../store/brandStore"
import ButtonUI from "../ui/ButtonUI"
import AccordionUI from "../ui/AccordionUI"
import CheckboxGroup from "../CheckboxGroup"
import InputsRangePrice from "../ui/InputsRangePrice"

const Filter = observer(() => {
	const filters = useFilterContext()

	useEffect(() => {
		Brand.fetchAllBrands()
	}, [])

	return (
		<aside className="flex flex-col sticky top-2 col-span-2">
			<div className="flex justify-between items-center px-2 py-3">
				<p className="font-bold">Фильтры</p>
				<ButtonUI
					onClick={filters.change.clearAll}
					innerText="Очистить"
					type="button"
					className="bg-transparent text-blue-400 underline font-light text-sm"
				/>
			</div>
			<AccordionUI title="Бренды">
				<CheckboxGroup
					items={Brand.brandList}
					selected={filters.state.brands}
					selectedChange={filters.change.toggleBrand}
				/>
			</AccordionUI>
			<AccordionUI title="Наличие">
				<CheckboxGroup
					selected={filters.state.available}
					selectedChange={filters.change.toggleAvailable}
					items={[
						{ id: 1, name: "В наличии" },
						{ id: 2, name: "Отсутствуют" },
					]}
				/>
			</AccordionUI>
			<AccordionUI title="Цена">
				<InputsRangePrice
					priceFromValue={String(filters.state.prices.priceFrom)}
					priceToValue={String(filters.state.prices.priceTo)}
					fromOnChange={(e) => filters.change.togglePrice("priceFrom", Number(e.target.value))}
					toOnChange={(e) => filters.change.togglePrice("priceTo", Number(e.target.value))}
				/>
			</AccordionUI>
		</aside>
	)
})

export default Filter
