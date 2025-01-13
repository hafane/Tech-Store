import { Outlet } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { User } from "../store/userStore"
import { Toaster } from "react-hot-toast"
import Breadcrumbs from "../components/Breadcrumbs"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const Root = observer(() => {
	useEffect(() => {
		async function refreshUser() {
			if (localStorage.getItem("token")) {
				return await User.refreshUser()
			}
		}
		refreshUser()
	}, [])

	return (
		<>
			<Toaster />
			<div className="px-4 md:px-0">
				<header>
					<Navbar />
				</header>
				<main className="container mx-auto min-h-[calc(100vh-130px)]">
					<Breadcrumbs />
					<Outlet context={User.isAuth} />
				</main>
			</div>
			<Footer />
		</>
	)
})

export default Root
