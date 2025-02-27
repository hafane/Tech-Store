import { Dispatch, SetStateAction, useState } from "react"
import MobileModal from "../../layouts/mobileModal"
import Tabs from "../loginComponents/Tabs"
import LoginForm from "../../Forms/loginForm"
import RegistrationForm from "../../Forms/registrationForm"
import ResetPasswordForm from "../../Forms/resetPasswordForm"
import { IoArrowBackOutline } from "react-icons/io5"

type props = {
	setIsModal: Dispatch<SetStateAction<boolean>>
}

const AuthModal = ({ setIsModal }: props) => {
	const [isPage, setIsPage] = useState<"login" | "registration" 
	| "reset">("login")

	const handleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setIsModal(false)
	}

	return (
		<MobileModal handleCloseModal={handleModal} setIsModal={setIsModal} Icon={IoArrowBackOutline} closeBtnClass="left-4">
			<div className="text-center mt-12 text-blue-500 text-2xl">
				<span>Tech</span>
			</div>
			<Tabs isPage={isPage} setIsPage={setIsPage} />
			<div className="overflow-hidden">
				<div className={`flex justify-center transition-transform ease-in-out duration-300 ${isPage === "login" ? "" : isPage === "registration" ? "-translate-x-full" : "translate-x-full"}`}>
					<ResetPasswordForm setIsModal={setIsModal} />
					<LoginForm setIsPage={setIsPage} setIsModal={setIsModal} />
					<RegistrationForm setIsModal={setIsModal} />
				</div>
			</div>
		</MobileModal>
	)
}

export default AuthModal
