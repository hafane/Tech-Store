import { useForm } from "react-hook-form"
import { validateRules } from "../utils/constants/FormInputConstants"
import InputTextUI from "../components/ui/InputTextUI"
import ButtonUI from "../components/ui/ButtonUI"
import { BiDotsHorizontal } from "react-icons/bi"
import { useLoaderData } from "react-router-dom"

type TResetForm = {
	newPassword: string
	repeatPassword: string
}

const NewPassword = () => {
    const loader = useLoaderData() as {status: boolean, message: string}
	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
		reset,
		getValues,
	} = useForm<TResetForm>()

    if(!loader!.status) {
        return (
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-center">Форма для смены пароля</h2>
                <p className="text-center">{loader!.message}</p>
            </div>
        )
    }

	const OnSubmit = async (data: TResetForm) => {
		console.log(data)
        reset()
	}

	return (
		<div className="max-w-xl mx-auto flex flex-col gap-4">
			<h2 className="text-2xl font-bold text-center">Форма для смены пароля</h2>
			<form onSubmit={handleSubmit(OnSubmit)} className="space-y-2" method="POST" id="newPassword">
				<InputTextUI
                    classNames="aria-[invalid=true]:outline-red-500"
					register={register("newPassword", validateRules.registerPassword)}
					type="password"
                    aria-invalid={errors.newPassword ? "true" : "false"}
					placeholder="Новый пароль"
					Icon={BiDotsHorizontal}
				/>
				{errors.newPassword && (
					<p className="text-red-500 text-xs">{errors.newPassword.message}</p>
				)}
				<InputTextUI
                    classNames="aria-[invalid=true]:outline-red-500"
					register={register("repeatPassword", {
						validate: value => value === getValues("newPassword"),
					})}
					type="password"
                    aria-invalid={errors.repeatPassword ? "true" : "false"}
					placeholder="Повторите пароль"
					Icon={BiDotsHorizontal}
				/>
				{errors.repeatPassword && (
					<p className="text-red-500 text-xs">Пароли не совпадают</p>
				)}
				<ButtonUI
					className="p-2 "
					disabled={isSubmitting}
					type="submit"
					children="Сменить пароль"
					form="newPassword"
				/>
			</form>
		</div>
	)
}

export default NewPassword
