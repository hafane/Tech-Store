import { useForm } from "react-hook-form"
import { observer } from "mobx-react-lite"
import { User } from "../../../store/userStore"
import ButtonUI from "../../../components/ui/ButtonUI"
import InputTextUI from "../../../components/ui/InputTextUI"
import { BiKey } from "react-icons/bi"
import { MdEmail } from "react-icons/md"
import { FaUser } from "react-icons/fa6"

type TForm = {
	newPassword?: string
	currentPassword: string
	newUsername?: string
	newEmail?: string
}

const Personal = observer(() => {
	const {formState: {errors}, handleSubmit, register, reset, setError} = useForm<TForm>()

	const userData = User.user

	const handleCreateActivate = async () => {
		await User.sendActivation()
	}

	const onSubmit = async (data: TForm) => {
		if(!userData.activation) return setError("root", {message: "Вы не активировали свою почту."})
		await User.changePersonalData(data.currentPassword, data.newUsername, data.newEmail, data.newPassword)
		reset()
	}

	return (
		<>
			<h3 className="mb-4">Личные данные</h3>
			<div>
				<form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-1/2 flex flex-col gap-4" id="personal" method="POST">
					<div className="flex gap-4">
						<label className="w-full">
							<span className="ml-3 text-sm font-light text-zinc-500">Имя</span>
							<InputTextUI
								Icon={FaUser}
								register={register("newUsername", {maxLength: 18})}
								iconClasses="size-5 top-5 text-zinc-400"
								classNames="bg-zinc-300/20 py-5 border-none"
								placeholder={userData.username}
								type="text"
							/>
						</label>
						<label className="w-full relative">
							<span className="ml-3 text-sm font-light text-zinc-500">
								Почта
							</span>
							<InputTextUI
								Icon={MdEmail}
								register={register("newEmail", {pattern: /^[A-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$/i})}
								iconClasses="size-5 top-5 text-zinc-400"
								classNames="bg-zinc-300/20 py-5 border-none"
								placeholder={userData.email}
								type="email"
							/>
							<button onClick={handleCreateActivate} disabled={userData.activation} type="button" className={`text-sm font-light absolute right-0 top-0 ${userData.activation ? "text-blue-500" : "text-red-500"}`}>{userData.activation ? "Подтверждено" : "Не подтверждено"}</button>
						</label>
					</div>
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
					{errors.root && <span className="text-red-500">{errors.root.message}</span>}
				</form>
				<ButtonUI
					disabled={!userData.activation}
					className="w-1/2 p-2 mt-4"
					form="personal"
					type="submit"
					children="Сохранить"
				/>
			</div>
		</>
	)
})

export default Personal
