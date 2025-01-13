import { User } from "../../store/userStore"
import { useMemo } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { profileConstants } from "../../utils/constants/ProfileConstants"
import { BiUserCircle } from "react-icons/bi"

const Profile = () => {
	const location = useLocation()
	const renderMenuItem = (item: {
		title: string
		icon: any
		link: string
		logout?: boolean
		admin?: boolean
	}) => {
		const isActive = location.pathname === `/profile${item.link}`
		const baseClass = "flex items-center gap-3 text-lg py-4 px-7 font-light"
		const activeClass = "border-l-2 border-blue-500"
		if (item.logout) {
			return (
				<li role="button" key={item.title} onClick={User.logoutUser}>
					<button className={`${baseClass} text-red-500`}>
						<item.icon size={24} />
						{item.title}
					</button>
				</li>
			)
		}
		if (item.admin && !User.isAdmin) return null
		return (
			<li
				role="button"
				key={item.title}
				className={isActive ? activeClass : ""}
			>
				<Link to={`/profile${item.link}`} className={baseClass}>
					<item.icon size={24} />
					{item.title}
				</Link>
			</li>
		)
	}
	const menuItems = useMemo(
		() => profileConstants.map(renderMenuItem),
		[profileConstants, location.pathname]
	)
	return (
		<div className="flex gap-12">
			<div>
				<aside className="max-w-96 w-96 bg-zinc-300/20 rounded-md">
					<span className="flex items-center gap-3 text-xl p-2 font-semibold">
						<BiUserCircle size={64} color="lightgray" />
						{User.user.username}
					</span>
					<ul className="space-y-2">{menuItems}</ul>
				</aside>
			</div>
			<div className="w-full py-4">
				<section>
					<Outlet context={User.isAdmin} />
				</section>
			</div>
		</div>
	)
}

export default Profile
