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


export interface ICreateReset extends Express.Request {
    params: {
        link: string
    }
    body: {
        newPassword: string
        repeatPassword: string
    }
}

export interface ICheckToken extends Express.Request {
    params: {
        token: string
    }
}