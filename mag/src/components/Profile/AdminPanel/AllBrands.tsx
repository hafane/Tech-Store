import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Brand } from "../../../store/brandStore"
import BrandAddModal from "../../modals/BrandAddModal"
import BrandItem from "./BrandItem/BrandItem"
import { BiPlus } from "react-icons/bi"

const AllBrands = observer(() => {
	const [createModal, setCreateModal] = useState<boolean>(false)

	useEffect(() => {
		Brand.fetchAllBrands()
	}, [])

	return (
		<div>
			<span className="mb-2 text-blue-600 font-light">
				<button
					className="flex items-center gap-2"
					onClick={() => setCreateModal(true)}
				>
					Добавить бренд
					<BiPlus size={15} />
				</button>
			</span>
			<div>
				<ul className="space-y-2">
					{Brand.brandList.map(brand => (
						<BrandItem id={brand.id} name={brand.name} key={brand.id} />
					))}
				</ul>
			</div>
			{createModal && (
				<BrandAddModal setIsModal={() => setCreateModal(false)} />
			)}
		</div>
	)
})

export default AllBrands
