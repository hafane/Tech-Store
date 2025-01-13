import { BiCheckCircle } from "react-icons/bi"
import { CiDeliveryTruck } from "react-icons/ci"
import ImageSwitcher from "../ImageSwitcher"

type Props = {
	name: string
	image: string[]
	available: number
	brandName: string
	categoryName: string
}

const ItemInfoImage = ({
	available,
	brandName,
	categoryName,
	name,
	image,
}: Props) => {
	return (
		<div className="flex justify-evenly mb-12">
			<ImageSwitcher images={image} defaultImage={image[0]} />
			<div>
				<div>
					<div>
						<h1 className="text-2xl">{name}</h1>
						<span className="text-sm font-light text-zinc-500">
							На складе: {available}
						</span>
					</div>
					<div className="flex justify-between mt-3 font-light text-sm text-zinc-500 [&>span]:flex [&>span>svg]:text-blue-600">
						<span className="items-center gap-2">
							<CiDeliveryTruck size={19} /> Free Delivery
						</span>
						<span className="items-center gap-2">
							<BiCheckCircle size={19} /> Guaranteed
						</span>
					</div>
				</div>
				<div className="mt-8">
					<ul>
						<li className="flex items-center text-sm text-zinc-500 font-light justify-between">
							Бренд:
							<span className="text-md font-normal text-zinc-900">
								{brandName}
							</span>
						</li>
						<li className="flex items-center text-sm text-zinc-500 font-light justify-between">
							Категория:
							<span className="text-md font-normal text-zinc-900">
								{categoryName}
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default ItemInfoImage
