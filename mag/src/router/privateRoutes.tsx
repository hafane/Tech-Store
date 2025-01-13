import React, { FC } from "react"
import { Navigate, useOutletContext } from "react-router-dom"

interface props extends React.PropsWithChildren {
    children: React.ReactElement
}

const PrivateRoutes: FC<props> = ({children}) => {

    const context = useOutletContext();

    return context ? children : <Navigate to="/" />
}

export default PrivateRoutes;
