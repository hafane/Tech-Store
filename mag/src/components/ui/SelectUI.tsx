import { useState } from "react"
import { LiaAngleDownSolid } from "react-icons/lia"

type itemArray = {
	id: number
	title: string
	value?: string
}

interface props {
	items?: itemArray[]
	onChange?: (title: string) => void
}

type dropdownState = {
	open: boolean
	selected?: string
}

const SelectUI = ({ items, onChange }: props) => {
	const [dropdown, setIsDropdown] = useState<dropdownState>({
		open: false,
		selected: undefined,
	})

	const handleSortClick = (title: string, value?: string) => {
		onChange?.(value!)
		setIsDropdown(prev => ({ ...prev, selected: title, open: false }))
	}

	return (
		<div className="relative">
			<button
				onClick={() => setIsDropdown(prev => ({ ...prev, open: !prev.open }))}
				data-dropdown={dropdown.open ? "open" : "closed"}
				className="flex shadow-md px-1 py-2 rounded-lg w-44 max-w-44 items-center justify-between [&[data-dropdown=open]>svg]:rotate-180"
			>
				<span>{dropdown.selected || "Сортировка"}</span>
				<LiaAngleDownSolid
					className="transition-transform duration-200"
					size={16}
				/>
			</button>
			{dropdown.open && (
				<ul
					data-dropdown={dropdown.open ? "open" : "closed"}
					className="absolute z-20 top-12 rounded-lg bg-white shadow-md w-44 max-w-44 px-1 py-2"
				>
					{items?.map(item => (
						<li
							onClick={() => handleSortClick(item.title, item.value!)}
							className="cursor-pointer p-1 hover:bg-zinc-300/20"
							key={item.id}
						>
							{item.title}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default SelectUI
