import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Category } from "../../../store/categoryStore"
import CategoryAddModal from "../../modals/CategoryAddModal"
import { BiPlus } from "react-icons/bi"
import CategoryItem from "./CategoryItem/CategoryItem"

const AllCategory = observer(() => {
	const [isModal, setIsModal] = useState<boolean>(false)

	useEffect(() => {
		Category.fetchList()
	}, [])

	return (
		<div>
			<span className="mb-2 text-blue-600 font-light">
				<button
					onClick={() => setIsModal(true)}
					className="flex items-center gap-2"
				>
					Добавить категорию
					<BiPlus size={15} />
				</button>
			</span>
			<div>
				<ul className="space-y-2">
					{Category.list.map(cate => (
						<CategoryItem id={cate.id} name={cate.name} key={cate.id} />
					))}
				</ul>
			</div>
			{isModal && (
				<CategoryAddModal
					setIdModal={() => setIsModal(false)}
				/>
			)}
		</div>
	)
})

export default AllCategory
