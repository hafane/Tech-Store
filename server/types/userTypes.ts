export interface ILogout extends Express.Request {
	cookies: {
		refreshCookie: string
	}
}
export interface IRefresh extends Express.Request {
    cookies: {
        refreshCookie: string
    }
}

export interface IActivate extends Express.Request {
    params: {
        link: string
    }
}