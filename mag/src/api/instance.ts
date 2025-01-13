import axios from "axios"
import { LoginResponse } from "../services/authServices"
import toast from "react-hot-toast"

const $host = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
})

const $authHost = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
})

$authHost.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
	return config
})

$host.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		try {
			if (error.response.status == 401 && error.config && !error.config._isRetry) {
                error.config._isRetry = true
				const response = await axios.get<LoginResponse>(
					`${import.meta.env.VITE_API_URL}/auth/refresh`,
					{ withCredentials: true }
				)
				localStorage.setItem("token", response.data.accessToken)
				return $host.request(error.config)
			}
            localStorage.removeItem("token")
		} catch (error: Error | any) {
            toast.error(error.response.data.message)
        }
        throw (error)
	}
)

export { $host, $authHost }
