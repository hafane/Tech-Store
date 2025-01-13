import { useState } from "react"
import { useForm } from "react-hook-form"
import { Brand } from "../../../../store/brandStore"
import InputTextUI from "../../../ui/InputTextUI"
import { BiCheck, BiPencil, BiTrash } from "react-icons/bi"
import { HiXMark } from "react-icons/hi2"

type props = {
    id: number
    name: string
}

type TForm = {
	name: string
	id: string
}

const BrandItem = ({id, name}: props) => {
    const [change, setChange] = useState<boolean>(false)
    const {handleSubmit, reset, formState: {errors}, register} = useForm<TForm>()

    const onSubmit = (data: TForm) => {
		Brand.changeBrand(Number(data.id), data.name)
		reset()
	}

	return (
		<li
			className="flex justify-between py-4 px-2 rounded-md bg-zinc-100/50"
		>
			<span className="flex gap-3 items-center">
				<p>Id: {id}</p>
				{change ? (
					<>
						<form
							onSubmit={handleSubmit(onSubmit)}
							id={id + "brand"}
							method="PATCH"
						>
							<InputTextUI
								register={register("name", { required: true })}
								type="text"
								placeholder={name}
							/>
							<InputTextUI
								register={register("id", {
									required: true,
									value: String(id),
								})}
								type="hidden"
								value={id}
								hidden
							/>
							{errors.name && (
								<span className="text-red-500 text-xs">Поле обязательно</span>
							)}
						</form>
						<button
							className="text-green-400"
							type="submit"
							form={id + "brand"}
							title="Сохранить"
						>
							<BiCheck size={19} />
						</button>
						<button className="text-red-400" onClick={() => setChange(false)}>
							<HiXMark size={18} />
						</button>
					</>
				) : (
					<p>Название: {name}</p>
				)}
			</span>
			<span className="flex gap-3 flex-row-reverse">
				<button
					className="text-red-400 transition-colors hover:text-red-300"
					onClick={() => Brand.deleteOneBrand(id)}
					title="Удалить"
				>
					<BiTrash size={19} />
				</button>
				<button
					hidden={change}
					onClick={() => setChange(true)}
					title="Изменить"
				>
					<BiPencil size={19} />
				</button>
			</span>
		</li>
	)
}

export default BrandItem
