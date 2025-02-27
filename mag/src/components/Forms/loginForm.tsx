import React from "react";
import { useForm } from "react-hook-form"
import { User } from "../../store/userStore"
import { validateRules } from "../../utils/constants/FormInputConstants"
import ButtonUI from "../ui/ButtonUI"
import InputTextUI from "../ui/InputTextUI"
import { BiDotsHorizontal, BiUser } from "react-icons/bi"

type TLoginForm = {
	username: string
	password: string
}

type props = {
	setIsModal: React.Dispatch<React.SetStateAction<boolean>>
    setIsPage: React.Dispatch<React.SetStateAction<"login" | "registration" | "reset">>
}

const LoginForm = ({ setIsModal, setIsPage }: props) => {
	const {
		formState: { isSubmitting, errors },
		register,
		handleSubmit,
		reset,
	} = useForm<TLoginForm>()

	const OnSubmit = async (data: TLoginForm) => {
		const user = await User.fetchUser(data.username, data.password)
		if (user) setIsModal(false)
		reset()
	}

	return (
		<div className="flex w-full flex-col shrink-0">
			<div className="text-2xl font-bold mt-10 mb-6 text-center">
				<span>Вход в аккаунт Tech</span>
			</div>
			<form
				className="space-y-3 mb-14"
				onSubmit={handleSubmit(OnSubmit)}
				id="loginForm"
				name="loginForm"
			>
				<InputTextUI
					classNames="text-zinc-400 border-zinc-300 aria-[invalid=true]:outline-red-500"
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
					classNames="text-zinc-400 border-zinc-300 aria-[invalid=true]:outline-red-500"
					iconClasses="text-zinc-400"
					Icon={BiDotsHorizontal}
					placeholder="Пароль"
                    aria-invalid={errors.password ? "true" : "false"}
					register={register("password", validateRules.loginPassword)}
					type="password"
				/>
				{errors.password && (
					<p className="w-96 text-red-500">{errors.password.message}</p>
				)}
				<div className="flex justify-end">
					<button onClick={() => setIsPage("reset")} type="button">
						<span className="text-blue-600 text-xs font-light">
							забыли пароль?
						</span>
					</button>
				</div>
				<ButtonUI
					disabled={isSubmitting}
					className="px-5 py-2 w-full"
					children="Войти"
					form="loginForm"
					type="submit"
				/>
			</form>
		</div>
	)
}

export default LoginForm
