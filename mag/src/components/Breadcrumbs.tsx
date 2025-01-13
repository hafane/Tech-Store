import { useBreadcrumbs } from "../hooks/useBreadcrumbs"
import { Link } from "react-router-dom"

const Breadcrumbs = () => {
	const crumbs = useBreadcrumbs(true)
	if (!crumbs || !crumbs.length) return null
	
	return (
		<ol className="flex gap-1 my-6">
			<li className="flex gap-1 items-center text-zinc-500 font-light">
				<Link to={"/"}>Home</Link>
			</li>
			{crumbs.map((crumb, index) => {
				const last = index === crumbs.length - 1
				return last ? (
					<li key={index} className="[&>a]:underline [&>a]:text-blue-400 flex gap-1 items-center text-zinc-500 font-light before:content-['/']">
						{crumb}
					</li>
				) : (
					<li
						className="flex gap-1 items-center text-zinc-500 font-light before:content-['/']"
						key={index}
					>
						{crumb}
					</li>
				)
			})}
		</ol>
	)
}

export default Breadcrumbs
