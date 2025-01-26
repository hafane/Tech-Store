import { useForm } from "react-hook-form"
import { Fragment, useState } from "react"
import { User } from "../../store/userStore"
import {
	AuthModalConfig,
	TAuthModalConfigForm,
} from "../../utils/constants/FormInputConstants"
import ModalLayout from "../layouts/modalLayout"
import Tabs from "./loginComponents/Tabs"
import InputTextUI from "../ui/InputTextUI"
import ButtonUI from "../ui/ButtonUI"

type props = {
	setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginModal = ({ setIsModal }: props) => {
	const [isPage, setIsPage] = useState<"login" | "registration">("login")
	const {
		formState: { errors },
		handleSubmit,
		reset,
		register,
	} = useForm<TAuthModalConfigForm>()

	const handleCloseModal = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setIsModal(false)
	}

	const OnSubmit = async (data: TAuthModalConfigForm) => {
		const user =
			isPage === "registration"
				? await User.registerUser(data.username, data.email, data.password)
				: await User.fetchUser(data.username, data.password)
		if (user) setIsModal(false)
		reset()
	}

	return (
		<ModalLayout handleCloseModal={handleCloseModal} setIsModal={setIsModal}>
			<Tabs isPage={isPage} setIsPage={setIsPage} />
			<div className="text-2xl font-bold mt-10 mb-6 text-center">
				<span>
					{isPage === "registration" ? "Регистрация" : "Вход в аккаунт Tech"}
				</span>
			</div>
			<form
				className="space-y-3 mb-14"
				onSubmit={handleSubmit(OnSubmit)}
				id="authForm"
				name="authForm"
			>
				{AuthModalConfig.map(item => (
					<Fragment key={item.name}>
						{isPage === "registration" && item.name === "email" ? (
							<InputTextUI
								classNames="text-zinc-400 border-zinc-300"
								iconClasses="text-zinc-400"
								Icon={item.Icon}
								placeholder={item.placeholder}
								register={register(item.name, item.validate)}
								type={item.type}
							/>
						) : item.name !== "email" && (
							<InputTextUI
								classNames="text-zinc-400 border-zinc-300"
								iconClasses="text-zinc-400"
								Icon={item.Icon}
								placeholder={item.placeholder}
								register={register(item.name, item.validate)}
								type={item.type}
							/>
						)}
						{errors[item.name as keyof TAuthModalConfigForm] && (
							<p className="w-96 text-red-500">
								{errors[item.name as keyof TAuthModalConfigForm]!.message}
							</p>
						)}
					</Fragment>
				))}
			</form>
			<ButtonUI
				className="px-5 py-2 w-full"
				children={isPage === "registration" ? "Регистрация" : "Войти"}
				form="authForm"
				type="submit"
			/>
		</ModalLayout>
	)
}

export default LoginModal