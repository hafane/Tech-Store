import { useState } from "react"
import ButtonUI from "../../ui/ButtonUI"
import FilterModal from "../../modals/Mobile/FilterModal"
import { LuSettings2 } from "react-icons/lu"

const MobileFilter = () => {
	const [openFilter, setOpenFilter] = useState<boolean>(false)

	return (
		<>
			<div className="flex px-2 py-3">
				<ButtonUI
					className="shadow-md px-1 py-2 rounded-lg w-44 max-w-44 gap-2 bg-white text-black"
					onClick={() => setOpenFilter(!openFilter)}
					children="Фильтры"
                    Icon={LuSettings2}
				/>
			</div>
			{openFilter && <FilterModal setOpenFilter={setOpenFilter} />}
		</>
	)
}
export default MobileFilter
