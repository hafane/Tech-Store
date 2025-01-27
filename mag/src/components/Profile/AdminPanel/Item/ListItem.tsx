import { deleteItem } from "../../../../services"
import toast from "react-hot-toast"
import { BiPencil, BiTrash } from "react-icons/bi"

type props = {
	image: string[]
	name: string
	price: number
	available: number
	id: number
	categoryId: number
	brandId: number
	itemId: number
}

const ListItem = ({
	image,
	name,
	price,
	available,
	id,
	categoryId,
	brandId,
	itemId
}: props) => {

    const handleDelete = async (id: number) => {
		try {
			await deleteItem(id)
			toast.success("Товар удален")
		} catch (error) {
			toast.error("Произошла ошибка при удалении товара")
			return console.log(error)
		}
	}

	return (
		<li
			className="block md:flex py-2 px-4 bg-zinc-200/20 items-center gap-5 rounded-md"
		>
			<div className="w-full block md:flex justify-between items-center">
				<span className="w-12 h-12">
					<img src={import.meta.env.VITE_IMAGE_URL + image[0]} alt={name} />
				</span>
				<div className="md:max-w-60 md:w-60 flex justify-between md:block">
					Название
					<p className="truncate">{name}</p>
				</div>
				<div className="flex justify-between md:block">
					Цена
					<p>{price} &#8381;</p>
				</div>
				<div className="flex justify-between md:block">
					Количество
					<p>{available}</p>
				</div>
				<div className="flex justify-between md:block">
					Id категории
					<p>{categoryId}</p>
				</div>
				<div className="flex justify-between md:block">
					Id бренда
					<p>{brandId}</p>
				</div>
				<div className="flex justify-between md:block">
					Id товара
					<p>{itemId}</p>
				</div>
			</div>
			<div>
				<span className="flex space-x-4">
					<button>
						<BiPencil size={20} />
					</button>
					<button
						className="text-red-600/20 transition-colors hover:text-red-600/10"
						onClick={() => handleDelete(id)}
					>
						<BiTrash size={20} />
					</button>
				</span>
			</div>
		</li>
	)
}

export default ListItem
