import { AxiosResponse } from "axios"
import { $authHost } from "../api/instance"
import { CommentURL } from "./enums/URLEnum"

type TComment = {
    message: string
}

export const addComment = async (itemId: string, title: string, content: string): Promise<AxiosResponse<TComment>> => {
    const data = await $authHost.post<TComment>(CommentURL.ADD + itemId, { title, content })
    return data
}

export const deleteComment = async (itemId: string, commentId: number): Promise<AxiosResponse<TComment>> => {
    const data = await $authHost.delete<TComment>(CommentURL.DELETE + itemId, { data: { commentId } })
    return data
}