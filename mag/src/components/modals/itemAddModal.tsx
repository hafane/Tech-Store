import { useState } from "react"
import { useForm } from "react-hook-form"
import {
	ItemAddModalConfig,
	TItemAddModalForm,
} from "../../utils/constants/FormInputConstants"
import { createItem } from "../../services/itemServices"
import ModalLayout from "../layouts/modalLayout"
import ButtonUI from "../ui/ButtonUI"
import InputTextUI from "../ui/InputTextUI"
import toast from "react-hot-toast"
import { HiXMark } from "react-icons/hi2"

type props = {
	setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}

type TInfo = {
	title?: string
	description?: string
}

const ItemAddModal = ({ setIsModal }: props) => {
	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm<TItemAddModalForm>()
	const [info, setInfo] = useState<TInfo>({
		title: "",
		description: "",
	})
	const [infoArr, setInfoArr] = useState<TInfo[]>([])

	const handleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setIsModal(false)
	}

	const handleAddInfo = () => {
		setInfoArr([...infoArr, info])
		setInfo({ title: "", description: "" })
	}

	const deleteInfo = (index: number) => {
		setInfoArr(infoArr.filter((_, i) => i !== index))
	}

	const onSubmit = (data: TItemAddModalForm) => {
		const formdata = new FormData()
		formdata.append("info", JSON.stringify(infoArr))
		Array.from(data.images).forEach(item => {
			formdata.append("images", item)
		})
		Object.entries(data).forEach(([key, value]) => {
			if (key !== "images" && key !== "info")
				formdata.append(key, value as string)
		})
		try {
			createItem(formdata)
			toast.success("Товар успешно добавлен")
			setIsModal(false)
		} catch (error: Error | any) {
			toast.error(error.response.data.message)
			return console.log(error)
		}
	}

	return (
		<ModalLayout setIsModal={setIsModal} handleCloseModal={handleModal}>
			<div className="text-2xl font-semibold text-center mb-2">
				<span>Добавление товара</span>
			</div>
			<div className="space-y-4">
				<form
					onSubmit={handleSubmit(onSubmit)}
					encType="multipart/form-data"
					id="itemAdd"
					className="space-y-2"
					method="POST"
				>
					{ItemAddModalConfig.map((item, index) => (
						<label key={index} htmlFor={item.name}>
							<span className="ml-3 text-sm font-light text-zinc-500">
								{item.title}
							</span>
							{item.type === "file" ? (
								<InputTextUI
									id={item.name}
									register={register(item.name, item.validate)}
									type={item.type}
									multiple
									placeholder="Изображение"
								/>
							) : (
								<InputTextUI
									id={item.name}
									register={register(item.name, item.validate)}
									type={item.type}
									placeholder={item.placeholder}
								/>
							)}
							{errors[item.name as keyof TItemAddModalForm] && (
								<p className="text-red-500 font-xs">Поле обязательно</p>
							)}
						</label>
					))}
				</form>
				<div>
					<span className="flex space-x-2">
						<InputTextUI
							value={info?.title}
							onChange={e => setInfo({ ...info, title: e.target.value })}
							placeholder="Заголовок"
						/>
						<InputTextUI
							value={info?.description}
							onChange={e => setInfo({ ...info, description: e.target.value })}
							placeholder="Описание"
						/>
						<ButtonUI
							onClick={handleAddInfo}
							className="px-4 py-2"
							children="+"
						/>
					</span>
					<ul>
						{infoArr &&
							infoArr.map((item, index) => (
								<li key={index} className="flex justify-between">
									<span>{item.title}</span>
									<span>{item.description}</span>
									<button onClick={() => deleteInfo(index)}>
										<HiXMark size={14} />
									</button>
								</li>
							))}
					</ul>
				</div>
				<ButtonUI form="itemAdd" className="w-full p-2" children="Добавить" />
			</div>
		</ModalLayout>
	)
}

export default ItemAddModal
