import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { IStore } from "../Navbar"
import { NavbarLinks, NavbarUlLis } from "../../utils/constants/NavbarConsts"
import { FiSearch } from "react-icons/fi"
import { BsBasket } from "react-icons/bs"
import { LuUser2 } from "react-icons/lu"
import logo from "../../assets/af457b845c916aafabc5f60a197b5da7.jpg"

type props = {
	isAuth: boolean
	setIsState: React.Dispatch<React.SetStateAction<IStore>>
}

const DesktopNavbar = ({ isAuth, setIsState }: props) => {
	const navigate = useNavigate()

	return (
		<nav className="relative z-40 py-3 border-b-2 border-blue-200/40 bg-white">
			<div className="container mx-auto flex items-center justify-between">
				<Link to={NavbarLinks.Home}>
					<img className="size-16" src={logo} alt="" />
				</Link>
				<ul className="flex w-[560px] justify-between [&>li]:text-xl [&>li]:font-light">
					{NavbarUlLis.map(item => (
						<li
							aria-pressed={item.link === window.location.pathname}
							role="button"
							key={item.link}
							onClick={() => navigate(item.link)}
							className={`${
								item.link === window.location.pathname
									? "text-blue-400 underline"
									: "text-neutral-700"
							} cursor-pointer`}
						>
							{item.text}
						</li>
					))}
				</ul>
				<div className="flex items-center gap-5">
					<button
						onClick={() => setIsState({ isSearchModal: true })}
						className="text-neutral-700"
					>
						<FiSearch size={22} />
					</button>
					{isAuth ? (
						<>
							<button onClick={() => setIsState({ isCartDrop: true })}>
								<BsBasket size={22} />
							</button>
							<button onClick={() => setIsState({ isDropdown: true })}>
								<LuUser2 size={22} />
							</button>
						</>
					) : (
						<button
							onClick={() => setIsState({ isAuthModal: true })}
							className="py-2 px-3 bg-blue-500 text-white rounded-lg font-light text-sm"
						>
							Login/Sign Up
						</button>
					)}
				</div>
			</div>
		</nav>
	)
}

export default DesktopNavbar
