import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Item } from "../../../store/itemStore"
import ItemAddModal from "../../modals/itemAddModal"
import { BiPlus } from "react-icons/bi"
import ListItem from "./Item/ListItem"

const AllItemsSection = observer(() => {
	const [isModal, setIsModal] = useState<boolean>(false)

	useEffect(() => {
		Item.fetchItems("1")
	}, [])

	return (
		<div>
			<span className="mb-2 text-blue-600 font-light">
				<button
					className="flex items-center gap-2"
					onClick={() => setIsModal(true)}
				>
					Добавить товар
					<BiPlus size={15} />
				</button>
			</span>
			<ul className="space-y-4">
				{Item.listItems.map(item => (
					<ListItem key={item.id} available={item.available} price={item.price} name={item.name} image={item.image} id={item.id} brandId={item.brandId} categoryId={item.categoryId} />
				))}
			</ul>
			{isModal && <ItemAddModal setIsModal={() => setIsModal(false)} />}
		</div>
	)
})

export default AllItemsSection
