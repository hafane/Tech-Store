import { useFilterContext } from "../../../context/filterContext"
import { observer } from "mobx-react-lite"
import { Item } from "../../../store/itemStore"
import { MdNavigateNext } from "react-icons/md"

const Pagination = observer(() => {
	const {
		state: { page },
		change: { setPage },
	} = useFilterContext()
	const itemsPerPage = 15
	const pageFromCount = Math.ceil((Item.listItemsCount + 1) / itemsPerPage)

	return (
		<div className="flex justify-center mb-12">
			<ul className="flex gap-3 items-center">
				<li
					className={page < pageFromCount ? "hidden" : "block"}
					title="Назад"
					role="button"
					onClick={() => setPage(prev => prev - 1)}
				>
					<MdNavigateNext size={20} transform="rotate(180)" />
				</li>
				{Array.from({ length: pageFromCount }, (_, index) => (
					<li
						role="button"
						onClick={() => setPage(index + 1)}
						data-current-page={Number(page) === index + 1}
						className="data-[current-page=true]:border-b-2 data-[current-page=true]:border-blue-500 data-[current-page=true]:text-blue-500 py-2 px-4"
						key={index + 1}
					>
						<button disabled={Number(page) === index + 1}>{index + 1}</button>
					</li>
				))}
				<li
					className={page < pageFromCount ? "block" : "hidden"}
					title="Далее"
					role="button"
					onClick={() => setPage(prev => prev + 1)}
				>
					<MdNavigateNext size={20} />
				</li>
			</ul>
		</div>
	)
})

export default Pagination
