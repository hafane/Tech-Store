import { useState } from "react"
import CommentsSection from "./Sections/CommentsSection"
import InfoSection from "./Sections/InfoSection"

type Props = {
	ItemInfo: {
		id: number
		itemId: number
		title: string
		description: string
	}[]

	Comments: {
		id: number
		itemId: number
		title: string
		userId: number
		content: string
		User: {
			id: number
			username: string
		}
	}[]
}

const BottomInfo = () => {
	const [selectedSection, setSelectedSection] = useState("characteristics")

	return (
		<section className="w-[calc(100%-16%)]">
			<div className="flex border-b gap-8">
				<span
					onClick={() => setSelectedSection("characteristics")}
					role="button"
					className={`px-4 py-2 text-lg font-light ${
						selectedSection === "characteristics"
							? "border-blue-500 border-b-2 text-blue-500"
							: "text-neutral-500 border-neutral-300"
					}`}
				>
					Характеристики
				</span>
				<span
					onClick={() => setSelectedSection("comments")}
					role="button"
					className={`px-4 py-2 text-lg font-light ${
						selectedSection === "comments"
							? "border-blue-500 border-b-2 text-blue-500"
							: "text-neutral-500 border-neutral-300"
					}`}
				>
					Комментарии
				</span>
			</div>
			<div className="mt-4">
				{selectedSection === "characteristics" && <InfoSection />}
				{selectedSection === "comments" && <CommentsSection />}
			</div>
		</section>
	)
}

export default BottomInfo
