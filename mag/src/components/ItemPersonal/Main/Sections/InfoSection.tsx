import { Item } from "../../../../store/itemStore"

const InfoSection = () => {
	return (
		<div>
			<h3 className="text-lg font-bold mb-4">Характеристики</h3>
			<ul>
				{Item.oneItem.ItemInfo.map(item => (
					<li
						key={item.id}
						className="flex py-4 px-2 rounded-md odd:bg-zinc-100/50 [&>span]:w-[calc(100%/2)] [&>span]:text-zinc-500"
					>
						<span>{item.title}</span>
						<span>{item.description}</span>
					</li>
				))}
			</ul>
		</div>
	)
}

export default InfoSection
