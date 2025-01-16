import { useOutsideClick } from "../../hooks/useOutsideClick"
import { twMerge } from "tailwind-merge"
import { IconType } from "react-icons"
import { HiXMark } from "react-icons/hi2"

type props = {
	handleCloseModal: (e: React.MouseEvent<HTMLButtonElement>) => void
	setIsModal: React.Dispatch<React.SetStateAction<boolean>>
	children: React.ReactNode
	Icon?: IconType
	closeBtnClass?: string
}

const MobileModal = ({ handleCloseModal, setIsModal, children, Icon, closeBtnClass }: props) => {

	const ref = useOutsideClick(() => {
		setIsModal(false)
	})

	return (
		<div
			ref={ref}
			className="fixed px-4 bg-white rounded-lg z-50 top-0 left-0 bottom-0 right-0"
		>
			{children}
			<button
				className={twMerge("absolute top-4 right-4 hover:bg-red-500/20 transition-colors", closeBtnClass)}
				onClick={handleCloseModal}
			>
				{Icon ? <Icon size={20} /> : <HiXMark size={20} />}
			</button>
		</div>
	)
}

export default MobileModal
