import { FaCheck } from "react-icons/fa6"
import { twMerge } from "tailwind-merge"

export interface CheckboxProps {
	id: string
	label: string
	value?: string | number
	checked?: boolean | string
	onChange?: (params?: any) => void
	labelClass?: string
	boxClass?: string
}

const CheckboxUI = ({ label, id, checked, onChange, labelClass, boxClass, value }: CheckboxProps) => {
	return (
		<div className={twMerge(`flex items-center`, boxClass)}>
			<button
				onClick={onChange}
				type="button"
				value={value}
				role="checkbox"
				id={`checkbox-${label}`}
			>
				<span className="w-4 h-4 border border-zinc-300 rounded flex items-center justify-center">
					<FaCheck className={`${checked ? "block" : "hidden"}`} size={14} />
				</span>
			</button>
			<label className={twMerge(`ml-2`, labelClass)} htmlFor={`checkbox-${label}`}>
				{label}
			</label>
		</div>
	)
}

export default CheckboxUI
