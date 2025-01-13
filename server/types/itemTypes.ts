export interface IGetOneItem extends Express.Request {
	params: {
		itemId: string
	}
}

export interface IGetAllItems extends Express.Request {
	query: {
		category?: string
		brand?: string
		available?: string
		priceFrom?: string
		priceTo?: string 
		page?: number
		sort?: string
	}
}

export interface IDeleteItemWithDep extends Express.Request {
	params: {
		itemId: string
	}
}

export interface ISearchItem extends Express.Request {
	query: {
		word: string
	}
}