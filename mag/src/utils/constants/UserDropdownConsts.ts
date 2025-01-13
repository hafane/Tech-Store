import { BiUserCircle } from "react-icons/bi"
import { TbLogout2 } from "react-icons/tb"
import { TbShoppingBag } from "react-icons/tb"

export const UserDropdownLinks = [
    {
        title: "Профиль",
        link: "/profile",
        Icon: BiUserCircle,
        isLog: false,
        isProfile: true
    },
    {
        title: "Заказы",
        link: "/profile/orders",
        Icon: TbShoppingBag,
        isLog: false,
        isProfile: false
    },
    {
        title: "Выход",
        link: "",
        Icon: TbLogout2,
        isLog: true,
        isProfile: false
    }
]