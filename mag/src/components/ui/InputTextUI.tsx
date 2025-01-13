import { UseFormRegisterReturn } from "react-hook-form"
import { twMerge } from "tailwind-merge"

interface props extends React.InputHTMLAttributes<HTMLInputElement> {
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>
	register?: UseFormRegisterReturn
	classNames?: string
	iconClasses?: string
}

const InputTextUI = ({Icon, register, classNames, iconClasses, ...props}: props) => {
	return (
		<fieldset className="relative">
            {Icon && <Icon className={twMerge(`size-6 absolute top-1/4 left-3`, iconClasses)} />}
			<input className={twMerge(`px-10 py-2 text-md border w-full rounded-md outline-blue-500`, classNames)} {...register} {...props} />
		</fieldset>
	)
}

export default InputTextUI
