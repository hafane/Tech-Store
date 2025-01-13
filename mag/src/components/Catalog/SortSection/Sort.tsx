import { useFilterContext } from "../../../context/filterContext"
import SelectUI from "../../ui/SelectUI"

const Sort = () => {
	const filters = useFilterContext()

	const handleClick = (title: string) => {
		filters.change.setSort(title)
	}

	return (
		<div className="flex md:justify-end px-2 py-3">
			<SelectUI
				onChange={handleClick}
				items={[
					{ id: 1, title: "По умолчанию", value: undefined },
					{ id: 2, title: "По цене", value: "price" },
					{ id: 3, title: "По названию", value: "name" },
				]}
			/>
		</div>
	)
}

export default Sort
