import { Link } from "react-router-dom"
import ButtonUI from "../../ui/ButtonUI"
import { User } from "../../../store/userStore"

interface props {
	image: string[]
	name: string
	price: number
	itemPageLink: string
	available: number
	buttonClick: () => void
}

const ItemCard = ({
	image,
	name,
	price,
	itemPageLink,
	buttonClick,
	available,
}: props) => {
	return (
		<div className="w-full px-4 py-2 mx-auto flex flex-col rounded-md shadow-md gap-4 group">
			{available === 0 && (
				<span className="text-zinc-600 text-sm absolute top-0 right-0 pr-2">
					НЕТ В НАЛИЧИИ
				</span>
			)}
			<Link className="flex justify-center" to={itemPageLink}>
				<img
					loading="lazy"
					width="200"
					height="200"
					src={import.meta.env.VITE_IMAGE_URL + image[0]}
					alt={name}
				/>
			</Link>
			<div className="h-[2px] bg-gradient-to-r from-gray-50 via-black to-gray-50 opacity-20"></div>
			<p className="text-md text-left overflow-hidden font-light">{name}</p>
			<div className="w-full flex justify-between items-center">
				<span className="text-lg font-light">{price}&#8381;</span>
				<ButtonUI
					disabled={available === 0 || User.isAuth === false}
					onClick={buttonClick}
					children="Купить"
					type="button"
					className={`bg-blue-400 text-white p-1 disabled:opacity-0 opacity-0 ${available === 0 || User.isAuth === false ? "group-hover:opacity-50" : "group-hover:opacity-100" }`}
				/>
			</div>
		</div>
	)
}

export default ItemCard
