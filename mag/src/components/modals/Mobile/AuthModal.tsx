import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import { User } from "../../../store/userStore"
import { validateRules } from "../../../utils/constants/validateConstants"
import MobileModal from "../../layouts/mobileModal"
import Tabs from "../loginComponents/Tabs"
import InputTextUI from "../../ui/InputTextUI"
import ButtonUI from "../../ui/ButtonUI"
import { MdOutlineMailOutline } from "react-icons/md"
import { LuKeyRound } from "react-icons/lu"
import { FiUser } from "react-icons/fi"
import { IoArrowBackOutline } from "react-icons/io5"

type props = {
	setIsModal: Dispatch<SetStateAction<boolean>>
}

type TForm = {
	username: string
	password: string
	email: string
}

const AuthModal = ({ setIsModal }: props) => {
	const [isPage, setIsPage] = useState<"login" | "registration">("login")
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<TForm>()

	const handleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setIsModal(false)
	}

	const OnSubmit = async (data: TForm) => {
		const user =
			isPage === "registration"
				? await User.registerUser(data.username, data.email, data.password)
				: await User.fetchUser(data.username, data.password)
		if (user) setIsModal(false)
	}

	return (
		<MobileModal handleCloseModal={handleModal} setIsModal={setIsModal} Icon={IoArrowBackOutline} closeBtnClass="left-4">
			<div className="text-center mt-12 text-blue-500 text-2xl">
				<span>Tech</span>
			</div>
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
		</MobileModal>
	)
}

export default AuthModal
