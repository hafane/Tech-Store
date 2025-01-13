import { useState } from "react"
import { useForm } from "react-hook-form"
import { Category } from "../../../../store/categoryStore"
import InputTextUI from "../../../ui/InputTextUI"
import { HiXMark } from "react-icons/hi2"
import { BiCheck, BiPencil, BiTrash } from "react-icons/bi"

type props = {
	id: number
	name: string
}

type TForm = {
	name: string
	id: string
}

const CategoryItem = ({ id, name }: props) => {
	const [change, setChange] = useState<boolean>(false)
	const {
		handleSubmit,
		reset,
		formState: { errors },
		register,
	} = useForm<TForm>()

	const onSubmit = (data: TForm) => {
		Category.changeOneCategory(Number(data.id), data.name)
		reset()
	}

	return (
		<li className="flex justify-between py-4 px-2 rounded-md bg-zinc-100/50">
			<span className="flex gap-3 items-center">
				<p>Id: {id}</p>
				{change ? (
					<>
						<form
							onSubmit={handleSubmit(onSubmit)}
							id={id + "category"}
							method="PATCH"
						>
							<InputTextUI
								register={register("name", { required: true })}
								placeholder={name}
								type="text"
							/>
							<InputTextUI
								register={register("id", {
									required: true,
									value: String(id),
								})}
								hidden
							/>
							{errors.name && (
								<span className="text-red-500 text-xs">Поле обязательно</span>
							)}
						</form>
						<button
							type="submit"
							form={id + "category"}
							className="text-green-400"
						>
							<BiCheck size={19} />
						</button>
						<button onClick={() => setChange(false)} className="text-red-400">
							<HiXMark size={19} />
						</button>
					</>
				) : (
					<p>Название: {name}</p>
				)}
			</span>
			<span className="flex gap-3 flex-row-reverse">
				<button
					onClick={() => Category.deleteOneCategory(id)}
					className="text-red-400 transition-colors hover:text-red-300"
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

export default CategoryItem
