import { useState } from "react"
import { useDeviceDetect } from "../hooks/useDeviceDetect"
import { observer } from "mobx-react-lite"
import { User } from "../store/userStore"
import DesktopNavbar from "./Navbar/DesktopNavbar"
import MobileNavbar from "./Navbar/MobileNavbar"
import LoginModal from "./modals/loginModal"
import UserDropdown from "./dropdowns/userDropdown"
import SearchModal from "./modals/searchModal"
import CartDropdown from "./dropdowns/cartDropdown"
import MobileSidebar from "./mobile/sidebar/mobileSidebar"
import AuthModal from "./modals/Mobile/AuthModal"

export interface IStore {
	isAuthModal?: boolean
	isSearchModal?: boolean
	isDropdown?: boolean
	isCartDrop?: boolean
}

const Navbar = observer(() => {
	const { isMobile } = useDeviceDetect()
	const [side, setSide] = useState<boolean>(false)
	const [isState, setIsState] = useState<IStore>({
		isAuthModal: false,
		isSearchModal: false,
		isDropdown: false,
		isCartDrop: false,
	})

	return (
		<>
			{isMobile ? (
				<MobileNavbar
					isAuth={User.isAuth}
					setIsState={setIsState}
					setSide={setSide}
				/>
			) : (
				<DesktopNavbar isAuth={User.isAuth} setIsState={setIsState} />
			)}
			{isState.isAuthModal && (
				isMobile ? <AuthModal setIsModal={() => setIsState({isAuthModal: false})} /> : <LoginModal setIsModal={() => setIsState({ isAuthModal: false })} />
			)}
			{isState.isDropdown && (
				<UserDropdown setIsDropdown={() => setIsState({ isDropdown: false })} />
			)}
			{isState.isSearchModal && (
				<SearchModal
					setSearchModal={() => setIsState({ isSearchModal: false })}
				/>
			)}
			{isState.isCartDrop && (
				<CartDropdown setCartOpen={() => setIsState({ isCartDrop: false })} />
			)}
			{side && <MobileSidebar setState={setSide} />}
		</>
	)
})

export default Navbar
