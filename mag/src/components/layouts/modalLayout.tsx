import React from "react"
import { useOutsideClick } from "../../hooks/useOutsideClick"
import { HiXMark } from "react-icons/hi2"

type props = {
	setIsModal: React.Dispatch<React.SetStateAction<boolean>>
	handleCloseModal: (e: React.MouseEvent<HTMLButtonElement>) => void
	children: React.ReactNode
}

const ModalLayout = ({ setIsModal, handleCloseModal, children }: props) => {
	const ref = useOutsideClick(() => {
		setIsModal(false)
	})
    
	return (
		<>
			<div className="top-0 left-0 right-0 bottom-0 z-50 absolute bg-black/30"></div>
			<div
				ref={ref}
				className="min-w-[560px] py-10 px-16 mx-auto my-auto fixed bg-white rounded-lg z-50 -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2"
			>
				{children}
				<button className="absolute top-4 right-4 hover:bg-red-500/20 transition-colors" onClick={handleCloseModal}>
					<HiXMark size={20} />
				</button>
			</div>
		</>
	)
}

export default ModalLayout
