import ButtonUI from "../../../components/ui/ButtonUI"
import InputTextUI from "../../../components/ui/InputTextUI"
import { BiKey } from "react-icons/bi"
import { FaUser } from "react-icons/fa6"
import { MdEmail } from "react-icons/md"
import { User } from "../../../store/userStore"
import { useForm } from "react-hook-form"

type TForm = {
	newPassword?: string
	currentPassword: string
	newUsername?: string
	newEmail?: string
}

const Personal = () => {
	const {formState: {errors}, handleSubmit, register, reset} = useForm<TForm>()

	const onSubmit = async (data: TForm) => {
		await User.changePersonalData(data.currentPassword, data.newUsername, data.newEmail, data.newPassword)
		reset()
	}

	return (
		<>
			<h1 className="mb-4">Личные данные</h1>
			<div>
				<form onSubmit={handleSubmit(onSubmit)} className="w-1/2 flex flex-col gap-4" id="personal">
					<span className="flex gap-4">
						<label className="w-full">
							<span className="ml-3 text-sm font-light text-zinc-500">Имя</span>
							<InputTextUI
								Icon={FaUser}
								register={register("newUsername", {maxLength: 18})}
								iconClasses="size-5 top-5 text-zinc-400"
								classNames="bg-zinc-300/20 py-5 border-none"
								placeholder={User.user.username}
								type="text"
							/>
						</label>
						<label className="w-full">
							<span className="ml-3 text-sm font-light text-zinc-500">
								Почта
							</span>
							<InputTextUI
								Icon={MdEmail}
								register={register("newEmail", {pattern: /^[A-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$/i})}
								iconClasses="size-5 top-5 text-zinc-400"
								classNames="bg-zinc-300/20 py-5 border-none"
								placeholder={User.user.email}
								type="email"
							/>
						</label>
					</span>
					<InputTextUI
						Icon={BiKey}
						register={register("newPassword", {maxLength: 24, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[%$#&*])/g,  minLength: 8})}
						iconClasses="size-5 top-5 text-zinc-400"
						classNames="bg-zinc-300/20 py-5 border-none"
						placeholder="Новый пароль"
						type="password"
					/>
					<InputTextUI
						Icon={BiKey}
						register={register("currentPassword", {required: true})}
						iconClasses="size-5 top-5 text-zinc-400"
						classNames="bg-zinc-300/20 py-5 border-none"
						placeholder="Текущий пароль"
						type="password"
					/>
					{errors.currentPassword && <span className="text-red-500">Поле обязательно.</span>}
					{errors.newEmail && <span className="text-red-500">Некорректная почта.</span>}
					{errors.newUsername && <span className="text-red-500">Некорректное имя.</span>}
				</form>
				<ButtonUI
					className="w-1/2 p-2 mt-4"
					form="personal"
					innerText="Сохранить"
				/>
			</div>
		</>
	)
}

export default Personal
