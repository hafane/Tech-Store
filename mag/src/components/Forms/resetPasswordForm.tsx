import React from "react";
import { useForm } from "react-hook-form"
import { User } from "../../store/userStore"
import ButtonUI from "../ui/ButtonUI"
import InputTextUI from "../ui/InputTextUI"
import { MdEmail } from "react-icons/md"

type TResetForm = {
	email: string
}

type props = {
	setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ResetPasswordForm = ({ setIsModal }: props) => {
	const {
		formState: { isSubmitting, errors },
		handleSubmit,
		register,
		reset,
	} = useForm<TResetForm>()

	const OnSubmit = async (data: TResetForm) => {
		const user = await User.createResetLink(data.email)
		if (user) return setIsModal(false)
		reset()
	}

	return (
		<div className="flex flex-col w-full shrink-0">
			<div className="text-2xl font-bold mt-10 mb-6 text-center">
				<span>Восстановление пароля</span>
			</div>
			<form
				onSubmit={handleSubmit(OnSubmit)}
				name="resetPassword"
				id="resetPassword"
				method="POST"
			>
				<InputTextUI
					classNames="text-zinc-400 border-zinc-300 aria-[invalid=true]:outlive-red-500"
					iconClasses="text-zinc-400"
					Icon={MdEmail}
					aria-invalid={errors.email ? "true" : "false"}
					placeholder="Почта"
					type="text"
					register={register("email", { required: true })}
				/>
				{errors.email && (
					<span className="text-red-500 text-sm">Поле обязательно</span>
				)}
				<ButtonUI
					disabled={isSubmitting}
					className="mt-4 p-2 w-full"
					type="submit"
					form="resetPassword"
					children="Восстановить"
				/>
			</form>
		</div>
	)
}

export default ResetPasswordForm
