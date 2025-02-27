import { useState } from "react"
import ModalLayout from "../layouts/modalLayout"
import Tabs from "./loginComponents/Tabs"
import LoginForm from "../Forms/loginForm"
import RegistrationForm from "../Forms/registrationForm"
import ResetPasswordForm from "../Forms/resetPasswordForm"

type props = {
	setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginModal = ({ setIsModal }: props) => {
	const [isPage, setIsPage] = useState<"login" | "registration" | "reset">("login")

	const handleCloseModal = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setIsModal(false)
	}

	return (
		<ModalLayout handleCloseModal={handleCloseModal} setIsModal={setIsModal}>
			<Tabs isPage={isPage} setIsPage={setIsPage} />
			<div className="overflow-hidden">
				<div className={`flex justify-center transition-transform ease-in-out duration-300 ${isPage === "login" ? "" : isPage === "registration" ? "-translate-x-full" : "translate-x-full"}`}>
					<ResetPasswordForm setIsModal={setIsModal} />
					<LoginForm setIsPage={setIsPage} setIsModal={setIsModal} />
					<RegistrationForm setIsModal={setIsModal} />
				</div>
			</div>
		</ModalLayout>
	)
}

export default LoginModal
