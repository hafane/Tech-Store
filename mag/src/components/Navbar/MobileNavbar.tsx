import { IStore } from "../Navbar"
import MobileSearch from "../mobile/search/mobileSearch"
import { BsBasket } from "react-icons/bs"
import { FiMenu } from "react-icons/fi"
import { LuUser2 } from "react-icons/lu"
import { CiLogin } from "react-icons/ci";

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
				<button type="button" onClick={handleOpenSidebar}>
					<FiMenu size={22} />
				</button>
				<h1 className="text-xl font-bold text-blue-500">Tech</h1>
				<div className="flex items-center gap-5">
					{isAuth ? (
						<>
							<button
								type="button"
								onClick={() => setIsState({ isCartDrop: true })}
							>
								<BsBasket size={22} />
							</button>
							<button
								type="button"
								onClick={() => setIsState({ isDropdown: true })}
							>
								<LuUser2 size={22} />
							</button>
						</>
					) : (
						<button
							type="button"
							onClick={() => setIsState({ isAuthModal: true })}
							className="flex items-center gap-2 py-2 px-3 text-blue-500 rounded-lg text-sm"
						>
							<CiLogin size={22} />
							Login
						</button>
					)}
				</div>
			</div>
			<MobileSearch />
		</nav>
	)
}

export default MobileNavbar
