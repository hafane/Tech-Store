import { twMerge } from "tailwind-merge"
import { useOutsideClick } from "../../hooks/useOutsideClick"

type Props = {
    setIsDropdown: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
    innerDivClass?: string
}

const DropdownLayout = ({setIsDropdown, children, innerDivClass}: Props) => {
    const ref = useOutsideClick(() => {
        setIsDropdown(false)
    })

    return (
        <>
			<div className="top-0 left-0 right-0 z-20 bottom-0 absolute bg-black/20"></div>
			<div
				ref={ref}
				className={twMerge(`absolute z-40 right-48 rounded-b-lg bg-white shadow-md`, innerDivClass)}
			>
				{children}
			</div>
		</>
    );
}

export default DropdownLayout;
