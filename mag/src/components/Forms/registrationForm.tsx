import React from "react";
import { useForm } from "react-hook-form"
import { User } from "../../store/userStore"
import InputTextUI from "../ui/InputTextUI"
import { BiDotsHorizontal, BiUser } from "react-icons/bi"
import { validateRules } from "../../utils/constants/FormInputConstants"
import { MdEmail } from "react-icons/md"
import ButtonUI from "../ui/ButtonUI"

type TRegistrationForm = {
	username: string
	password: string
	email: string
}

type props = {
	setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}

const RegistrationForm = ({ setIsModal }: props) => {
	const {
		formState: { errors, isSubmitting },
		handleSubmit,
		register,
		reset,
	} = useForm<TRegistrationForm>()

	const OnSubmit = async (data: TRegistrationForm) => {
		const user = await User.registerUser(
			data.username,
			data.email,
			data.password
		)
		if (user) setIsModal(false)
		reset()
	}

	return (
		<div className="flex w-full flex-col shrink-0">
			<div className="text-2xl font-bold mt-10 mb-6 text-center">
				<span>
					Регистрация
				</span>
			</div>
			<form
				className="space-y-3 mb-14"
				onSubmit={handleSubmit(OnSubmit)}
				id="registrationForm"
				name="registrationForm"
			>
				<InputTextUI
					classNames="text-zinc-400 border-zinc-300 aria-[invalid=true]:outlive-red-500"
					iconClasses="text-zinc-400"
					Icon={BiUser}
					placeholder="Логин"
					aria-invalid={errors.username ? "true" : "false"}
					register={register("username", validateRules.username)}
					type="text"
				/>
				{errors.username && (
					<p className="w-96 text-red-500">{errors.username.message}</p>
				)}
				<InputTextUI
					classNames="text-zinc-400 border-zinc-300 aria-[invalid=true]:outlive-red-500"
					iconClasses="text-zinc-400"
					Icon={MdEmail}
					placeholder="Почта"
					aria-invalid={errors.email ? "true" : "false"}
					register={register("email", validateRules.email)}
					type="text"
				/>
				{errors.email && (
					<p className="w-96 text-red-500">{errors.email.message}</p>
				)}
				<InputTextUI
					classNames="text-zinc-400 border-zinc-300 aria-[invalid=true]:outlive-red-500"
					iconClasses="text-zinc-400"
					Icon={BiDotsHorizontal}
					placeholder="Пароль"
					aria-invalid={errors.password ? "true" : "false"}
					register={register("password", validateRules.registerPassword)}
					type="password"
				/>
				{errors.password && (
					<p className="w-96 text-red-500">{errors.password.message}</p>
				)}
				<ButtonUI
					disabled={isSubmitting}
					className="px-5 py-2 w-full"
					children="Зарегистрироваться"
					form="registrationForm"
					type="submit"
				/>
			</form>
		</div>
	)
}

export default RegistrationForm
