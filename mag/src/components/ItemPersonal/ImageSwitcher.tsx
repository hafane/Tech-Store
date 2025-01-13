import { useState } from "react"

type Props = {
	defaultImage: string
	images?: string[]
}

const ImageSwitcher = ({ defaultImage, images }: Props) => {
	const [activeImage, setActiveImage] = useState<string>("")

	return (
		<div>
			<img src={import.meta.env.VITE_IMAGE_URL + (activeImage ? activeImage : defaultImage)} alt={activeImage ? activeImage : defaultImage} />
			<div className="flex gap-3 mt-4 overflow-x-scroll">
				{images?.map((item, index) => (
					<div onMouseEnter={() => setActiveImage(item)} key={index} className="max-w-16 mb-1 max-h-16 bg-zinc-100 rounded-md p-2">
						<img src={import.meta.env.VITE_IMAGE_URL + item} alt={item}  />
					</div>
				))}
			</div>
		</div>
	)
}

export default ImageSwitcher
