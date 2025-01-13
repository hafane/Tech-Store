import InputTextUI from "./InputTextUI"

type Props = {
	priceFromValue?: string
	priceToValue?: string
	fromOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	toOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputsRangePrice = ({
	priceFromValue,
	priceToValue,
	fromOnChange,
	toOnChange
}: Props) => {
	return (
		<div className="flex items-center justify-between p-2">
			<InputTextUI
				value={priceFromValue}
				onChange={fromOnChange}
				type="number"
				name="priceFrom"
				placeholder="от"
				classNames="p-1"
				min={0}
				max={500000}
			/>
			<span>—</span>
			<InputTextUI
				value={priceToValue}
				onChange={toOnChange}
				type="number"
				name="priceTo"
				placeholder="до"
				min={0}
				max={500000}
				classNames="p-1"
			/>
		</div>
	)
}

export default InputsRangePrice
