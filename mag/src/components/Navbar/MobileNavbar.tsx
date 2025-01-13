import { IStore } from "../Navbar"
import MobileSearch from "../mobile/search/mobileSearch"
import { BsBasket } from "react-icons/bs"
import { FiMenu } from "react-icons/fi"
import { LuUser2 } from "react-icons/lu"

type props = {
	isAuth: boolean
	setIsState: React.Dispatch<React.SetStateAction<IStore>>
	setSide: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileNavbar = ({ isAuth, setIsState, setSide }: props) => {
	const handleOpenSidebar = () => {
		setSide(true)
	}

	return (
		<nav className="relative z-40 py-3 bg-white">
			<div className="container mx-auto flex items-center justify-between mb-6">
				<button onClick={handleOpenSidebar}>
					<FiMenu size={22} />
				</button>
				<span className="text-xl font-bold text-blue-500">
					Tech
				</span>
				<div className="flex items-center gap-5">
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
			<MobileSearch />
		</nav>
	)
}

export default MobileNavbar
