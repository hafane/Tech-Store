//comment controller types
export interface IAddComment extends Express.Request {
    body: {
        title: string,
        content: string
    },
    params: {
        itemId: string
    }
}

export interface IDeleteComment extends Express.Request {
    params: {
        itemId: string
    },
    body: {
        commentId: number
    }
}