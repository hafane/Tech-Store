import useDeviceDetect from "../hooks/useDeviceDetect"
import DesktopFooter from "./Footer/DesktopFooter"
import MobileFooter from "./Footer/MobileFooter"

const Footer = () => {
	const { isMobile } = useDeviceDetect()

	return <>{isMobile ? <MobileFooter /> : <DesktopFooter />}</>
}

export default Footer
