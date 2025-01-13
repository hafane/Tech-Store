import { isRouteErrorResponse, useRouteError, Link } from "react-router-dom"
import { FaExclamation } from "react-icons/fa6";
import { TbError404 } from "react-icons/tb";

export const RouteError = () => {
	const error = useRouteError()
    console.log(error)
	if (isRouteErrorResponse(error)) {
        if(error.status === 404) {
            return (
                <div className="h-screen w-screen">
                    <div className="mx-auto flex flex-col items-center justify-center gap-4">
                        <TbError404 className="size-32 text-blue-400" />
                        <h1 className="text-6xl font-bold text-blue-400">Oops!</h1>
                        <p className="text-2xl font-bold text-blue-400">Page not found!</p>
                        <Link to={'/'} className="text-2xl font-bold text-blue-400 rounded-md p-3 border-2 border-blue-400">
                            Back to home
                        </Link>
                    </div>
                </div>
            )
        }
		return (
			<div>
				<h1>{error.status}</h1>
				<p>{error.data.message}</p>
			</div>
		)
	} else {
		return <div className="text-3xl text-blue-400 font-bold">
                <FaExclamation className="size-4" />
                Something went wrong...
            </div>
	}
}
