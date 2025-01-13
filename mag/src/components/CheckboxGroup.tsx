import CheckboxUI from "./ui/CheckboxUI"

type itemArray = {
    id: number
    name: string
}

interface props {
	items: itemArray[]
    selected?: Set<string>
    selectedChange?: (id: string) => void
}

const CheckboxGroup = ({ items, selected, selectedChange }: props) => {
	return (
		<div className="flex flex-col gap-2 mb-2">
			{items.map(item => (
				<CheckboxUI
					id={item.name}
					key={item.id}
                    labelClass="text-sm font-light"
					label={item.name}
					checked={selected?.has(item.name)}
					onChange={() => selectedChange?.(item.name)}
					value={item.name}
				/>
			))}
		</div>
	)
}

export default CheckboxGroup
