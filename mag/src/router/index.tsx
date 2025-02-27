import {createBrowserRouter, Link} from "react-router-dom"
import {RouteError} from "./routeError"
import {Item as ItemStore} from "../store/itemStore"
import {Cart as CartStore} from "../store/cartStore"
import Root from "./root"
import Cart from "../pages/Cart"
import PrivateRoutes from "./privateRoutes"
import Catalog from "../pages/Catalog"
import Item from "../pages/Item"
import DynamicCrumbName from "../components/DynamicCrumbName"
import Home from "../pages/Home"
import Contact from "../pages/Contact"
import Profile from "../pages/Profile/Profile"
import Personal from "../pages/Profile/sections/personal"
import Admin from "../pages/Profile/sections/admin"
import Orders from "../pages/Profile/sections/orders"
import Checkout from "../pages/Checkout"
import {paymentCallback} from "../services/paymentServices"
import FAQ from "../pages/FAQ"
import Blog from "../pages/Blog"
import {FilterProvider} from "../context/filterContext"
import NewPassword from "../pages/NewPassword"
import {User} from "../store/userStore"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <RouteError />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/catalog",
				handle: {
					crumb: () => <Link to="/catalog">Каталог</Link>,
				},
				children: [
					{
						index: true,
						element: (
							<FilterProvider>
								<Catalog />
							</FilterProvider>
						),
					},
					{
						path: "item/:id",
						loader: ({ params }) => ItemStore.fetchOneItem(String(params.id)),
						element: <Item />,
						handle: {
							crumb: () => <DynamicCrumbName linkTo="/catalog/item/" />,
						},
					},
				],
			},
			{
				path: "/blog",
				element: <Blog />,
				handle: {
					crumb: () => <Link to="/blog">Блог</Link>,
				},
			},
			{
				path: "/FAQ",
				element: <FAQ />,
				handle: {
					crumb: () => <Link to="/FAQ">FAQ</Link>,
				},
			},
			{
				path: "/contact",
				element: <Contact />,
				handle: {
					crumb: () => <Link to="/contact">Контакты</Link>,
				},
			},
			{
				path: "/cart",
				loader: () => {
					if (!CartStore.userCart.CartItem) {
						return CartStore.fetchUserCart()
					} else return null
				},
				element: (
					<PrivateRoutes>
						<Cart />
					</PrivateRoutes>
				),
				handle: {
					crumb: () => <Link to="/cart">Корзина</Link>,
				},
			},
			{
				path: "/profile",
				element: (
					<PrivateRoutes>
						<Profile />
					</PrivateRoutes>
				),
				handle: {
					crumb: () => <Link to="/profile">Профиль</Link>,
				},
				children: [
					{
						path: "personal",
						element: <Personal />,
						handle: {
							crumb: () => <Link to="/profile/personal">Личные данные</Link>,
						},
					},
					{
						path: "orders",
						element: <Orders />,
						handle: { crumb: () => <Link to="/profile/orders">Заказы</Link> },
					},
					{
						path: "admin-panel",
						element: <Admin />,
						handle: {
							crumb: () => <Link to="/profile/admin-panel">Админ панель</Link>,
						},
					},
				],
			},
			{
				path: "/checkout",
				loader: paymentCallback,
				element: (
					<PrivateRoutes>
						<Checkout />
					</PrivateRoutes>
				),
			},
			{
				path: "/reset-password/:token",
				element: <NewPassword/>,
				loader: async ({params}) => {
					if (params.token) {
						return await User.checkResetToken(params.token)
					}
				}
			}
		],
	},
])
