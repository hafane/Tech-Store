import { BiMinus, BiPlus } from "react-icons/bi"

type Props = {
	value?: number
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const CountUI = ({ value, onClick }: Props) => {
	return (
		<div className="w-full flex mb-2 justify-between items-center">
			<span className="flex gap-4 shadow-md px-2 py-1 items-center">
				<button
					disabled={value === 1}
					type="button"
					name="minus"
					onClick={onClick}
					className="text-zinc-600 text-lg disabled:cursor-not-allowed disabled:text-zinc-300"
				>
					<BiMinus />
				</button>
				<span className="cursor-default text-sm text-zinc-400">{value}</span>
				<button
					type="button"
					name="plus"
					onClick={onClick}
					className="text-zinc-600 text-lg"
				>
					<BiPlus />
				</button>
			</span>
		</div>
	)
}

export default CountUI
