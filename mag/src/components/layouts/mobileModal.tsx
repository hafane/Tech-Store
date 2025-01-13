import { useOutsideClick } from "../../hooks/useOutsideClick"
import { HiXMark } from "react-icons/hi2"

type props = {
	setIsModal: React.Dispatch<React.SetStateAction<boolean>>
	handleCloseModal: (e: React.MouseEvent<HTMLButtonElement>) => void
	children: React.ReactNode
}

const MobileModal = ({ handleCloseModal, setIsModal, children }: props) => {
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
				className="absolute top-4 right-4 hover:bg-red-500/20 transition-colors"
				onClick={handleCloseModal}
			>
				<HiXMark size={20} />
			</button>
		</div>
	)
}

export default MobileModal
