import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { LiaAngleDownSolid } from "react-icons/lia"

interface props {
	children?: React.ReactNode
    title: string
	titleClass?: string
	wrapClass?: string
}

const AccordionUI = ({ children, title, titleClass, wrapClass }: props) => {
	const [collapse, setIsCollapse] = useState<boolean>(false)

	return (
		<div
			data-collapse-toggle={collapse ? "not-collapsed" : "collapsed"}
			className={twMerge("border-b-2 border-zinc-300 px-2", wrapClass)}
		>
			<h3 className="flex py-3">
				<button
					onClick={() => setIsCollapse(!collapse)}
					className={twMerge("flex flex-1 items-center justify-between font-light 								[&[data-collapse-toggle=not-collapsed]>svg]:rotate-180", titleClass)}
					data-collapse-toggle={collapse ? "not-collapsed" : "collapsed"}
				>
					{title}
					<LiaAngleDownSolid
						className="transition-transform duration-200"
						size={16}
					/>
				</button>
			</h3>
			<div data-collapse-toggle={collapse ? "not-collapsed" : "collapsed"} hidden={!collapse} className="overflow-hidden data-[collapse-toggle=not-collapsed]:animate-accordion-open">{children}</div>
		</div>
	)
}

export default AccordionUI
