import { useNavigate } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { User } from "../../store/userStore"
import { NavbarLinks } from "../../utils/constants/NavbarConsts"
import { UserDropdownLinks } from "../../utils/constants/UserDropdownConsts"
import DropdownLayout from "../layouts/dropdownLayout"

type props = {
	setIsDropdown: React.Dispatch<React.SetStateAction<boolean>>
}

const UserDropdown = observer(({ setIsDropdown }: props) => {
	const navigate = useNavigate()

	const handleLogout = async () => {
		await User.logoutUser()
		setIsDropdown(false)
		navigate(NavbarLinks.Home)
	}

	return (
		<DropdownLayout setIsDropdown={setIsDropdown}>
			<ul className="flex flex-col p-1 gap-2 [&>li]:cursor-default">
				{UserDropdownLinks.map(
					item =>
						(item.isProfile && (
							<li
								key={item.title}
								onClick={() => navigate(item.link)}
								className="flex p-1 items-center gap-2 text-md text-blue-400 hover:bg-zinc-500/10 rounded-md"
							>
								<item.Icon size={20} />
								<div className="flex flex-col">
									{User.user.username}
									<span className="text-sm text-zinc-600">
										{User.user.email}
									</span>
								</div>
							</li>
						)) ||
						(item.isLog && (
							<li
								key={item.title}
								onClick={handleLogout}
								className="flex p-1 items-center gap-2 text-md text-zinc-600 hover:bg-zinc-500/10 rounded-md"
							>
								<item.Icon size={20} />
								{item.title}
							</li>
						)) || (
							<li
								key={item.title}
								onClick={() => navigate(item.link)}
								className="flex p-1 items-center gap-2 text-md text-zinc-600 hover:bg-zinc-500/10 rounded-md"
							>
								<item.Icon size={20} />
								{item.title}
							</li>
						)
				)}
			</ul>
		</DropdownLayout>
	)
})

export default UserDropdown
