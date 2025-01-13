import { ReactNode } from "react"
import { GiVacuumCleaner } from "react-icons/gi";
import { BiSolidCarWash } from "react-icons/bi";
import { FaJugDetergent } from "react-icons/fa6";
import { GiSteam } from "react-icons/gi";

interface ObjectSettings {
    [key: string]: ReactNode
}

export const CatalogHeadConst: ObjectSettings = {
    "Пылесосы": <GiVacuumCleaner size={42}/>,
    "Автомойки": <BiSolidCarWash size={42} />,
    "Моющие средства": <FaJugDetergent size={42} />,
    "Пароочистители": <GiSteam size={42} />
}