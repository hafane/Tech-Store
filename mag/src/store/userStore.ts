import { makeAutoObservable } from "mobx"
import { jwtDecode } from "jwt-decode"
import { LoginApi, RegistrationApi, LogoutApi, RefreshApi, ChangePersonal } from "../services"
import toast from "react-hot-toast"

type UserData = {
	id: number
	username: string
	email: string
	activation: boolean
}

class UserStore {
	isAuth = false
	isAdmin = false
	user = {} as UserData
	constructor() {
		makeAutoObservable(this)
	}

	private setUser(data: UserData) {
		this.user = data
	}

	private setIsAuth(bool: boolean) {
		this.isAuth = bool
	}

	private setIsAdmin(bool: boolean) {
		this.isAdmin = bool
	}

	private decodeAccessToken(token: string) {
		const decoded: any = jwtDecode(token)
		return decoded.role
	}

	fetchUser = async (username: string, password: string) => {
		try {
			const userData = await LoginApi(username, password)
			this.setUser(userData.data.user)
			this.setIsAuth(true)
			const token = userData.data.accessToken
			this.setIsAdmin(this.decodeAccessToken(token) === "ADMIN")
			toast.success("Вы успешно авторизовались.")
			return true
		} catch (error: Error | any) {
			toast.error(error.response.data.message)
			return false
		}
	}

	registerUser = async (username: string, email: string, password: string) => {
		try {
			const userData = await RegistrationApi(username, email, password)
			this.setUser(userData.data.user)
			this.setIsAuth(true)
			toast.success("Вы успешно зарегистрировались.")
			return true
		} catch (error: Error | any) {
			toast.error(error.response.data.message)
			return false
		}
	}

	logoutUser = async () => {
		try {
			const logout = await LogoutApi()
			this.setUser({} as UserData)
			this.setIsAuth(false)
			this.setIsAdmin(false)
			toast.success(logout.data.message)
			return
		} catch (error: Error | any) {
			toast.error(error.response.data.message)
			return
		}
	}

	refreshUser = async () => {
		try {
			const refresh = await RefreshApi()
			this.setUser(refresh.data.user)
			this.setIsAuth(true)
			const token = refresh.data.accessToken
			this.setIsAdmin(this.decodeAccessToken(token) === "ADMIN")
			return
		} catch (error: Error | any) {
			return console.log(error.response.data.message)
		}
	}

	changePersonalData = async (oldPassword: string, username?: string, email?: string, password?: string) => {
		try {
			const change = await ChangePersonal(oldPassword, email || undefined, username || undefined, password || undefined)
			this.setUser(change.data.user)
			this.setIsAuth(true)
			return toast.success("Данные успешно изменены.")
		} catch (error: Error | any) {
			toast.error("Произошла ошибка при изменении данных.")
			return console.log(error.response.data.message) 
		}	
	}
}

export const User = new UserStore()