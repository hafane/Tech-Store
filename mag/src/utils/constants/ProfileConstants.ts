import { BiLogOut, BiUserCircle } from "react-icons/bi"
import { MdAdminPanelSettings } from "react-icons/md"
import { TbShoppingBag } from "react-icons/tb"

export const profileConstants = [
    {title: 'Информация', link: "/personal", icon: BiUserCircle, admin: false, logout: false},
    {title: 'Заказы', link: "/orders", icon: TbShoppingBag, admin: false, logout: false},
    {title: 'Админ панель', link: "/admin-panel", icon: MdAdminPanelSettings, admin: true, logout: false},
    {title: 'Выход', link: "null", icon: BiLogOut, admin: false, logout: true},
]