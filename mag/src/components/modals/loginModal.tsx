import { useForm } from "react-hook-form"
import { useState } from "react"
import { User } from "../../store/userStore"
import { validateRules } from "../../utils/constants/validateConstants"
import ModalLayout from "../layouts/modalLayout"
import Tabs from "./loginComponents/Tabs"
import InputTextUI from "../ui/InputTextUI"
import ButtonUI from "../ui/ButtonUI"
import { LuKeyRound } from "react-icons/lu"
import { MdOutlineMailOutline } from "react-icons/md"
import { FiUser } from "react-icons/fi"

type props = {
	setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}

type TUseForm = {
	username: string
	password: string
	email: string
}

const LoginModal = ({ setIsModal }: props) => {
	const [isPage, setIsPage] = useState<"login" | "registration">("login")
	const {
		formState: { errors },
		handleSubmit,
		reset,
		register,
	} = useForm<TUseForm>()

	const handleCloseModal = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setIsModal(false)
	}

	const OnSubmit = async (data: TUseForm) => {
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
			<h1 className="text-2xl font-bold mt-10 mb-6 text-center">
				{isPage === "registration" ? "Регистрация" : "Вход в аккаунт Tech"}
			</h1>
			<form
				className="space-y-3 mb-14"
				onSubmit={handleSubmit(OnSubmit)}
				id="authForm"
				name="authForm"
			>
				<InputTextUI
					classNames="text-zinc-400 border-zinc-300"
					iconClasses="text-zinc-400"
					Icon={FiUser}
					placeholder="Логин"
					type="text"
					register={register("username", validateRules.username)}
				/>
				{isPage === "registration" && (
					<InputTextUI
						classNames="text-zinc-400 border-zinc-300"
						iconClasses="text-zinc-400"
						Icon={MdOutlineMailOutline}
						placeholder="Почта"
						register={register("email", validateRules.email)}
						type="email"
					/>
				)}
				<InputTextUI
					classNames="text-zinc-400 border-zinc-300"
					iconClasses="text-zinc-400"
					Icon={LuKeyRound}
					placeholder="Пароль"
					register={register("password", validateRules.password)}
					type="password"
				/>
				{errors.password && (
					<p className="text-red-500">{errors.password.message}</p>
				)}
				{(errors.username || errors.email) && (
					<p className="text-red-500">
						{errors.email?.message || errors.username?.message}
					</p>
				)}
			</form>
			<ButtonUI
				className="px-5 py-2 w-full"
				innerText={isPage === "registration" ? "Регистрация" : "Войти"}
				form="authForm"
				type="submit"
			/>
		</ModalLayout>
	)
}

export default LoginModal
