import { useState } from "react"
import {
	AllItemsSection,
	AllOrdersSection,
	AllBrands,
	AllCategory,
} from "../../../components/Profile"

const Admin = () => {
	const [adminSection, setAdminSection] = useState<string>("")

	const baseClass =
		"data-[current-section=true]:text-blue-600 data-[current-section=true]:border-b-2 data-[current-section=true]:border-blue-600 text-zinc-500 cursor-pointer"

	return (
		<>
			<h3 className="mb-4">Админ панель</h3>
			<div className="flex flex-col gap-8">
				<div className="border-b">
					<div className="w-full md:w-1/2 flex justify-between">
						<span
							data-current-section={adminSection === "Товар"}
							className={baseClass}
						>
							<button onClick={() => setAdminSection("Товар")}>Товар</button>
						</span>
						<span
							data-current-section={adminSection === "Заказы"}
							className={baseClass}
						>
							<button onClick={() => setAdminSection("Заказы")}>Заказы</button>
						</span>
						<span
							data-current-section={adminSection === "Бренды"}
							className={baseClass}
						>
							<button onClick={() => setAdminSection("Бренды")}>Бренды</button>
						</span>
						<span
							data-current-section={adminSection === "Категории"}
							className={baseClass}
						>
							<button onClick={() => setAdminSection("Категории")}>
								Категории
							</button>
						</span>
					</div>
				</div>
				{adminSection === "Товар" && <AllItemsSection />}
				{adminSection === "Заказы" && <AllOrdersSection />}
				{adminSection === "Бренды" && <AllBrands />}
				{adminSection === "Категории" && <AllCategory />}
			</div>
		</>
	)
}

export default Admin
