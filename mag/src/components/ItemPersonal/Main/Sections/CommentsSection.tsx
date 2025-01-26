import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { Item } from "../../../../store/itemStore"
import { User } from "../../../../store/userStore"
import {
	addComment,
	deleteComment,
} from "../../../../services/commentsServices"
import InputTextUI from "../../../ui/InputTextUI"
import ButtonUI from "../../../ui/ButtonUI"
import TextareaUI from "../../../ui/TextareaUI"
import toast from "react-hot-toast"
import { BiPencil, BiTrash } from "react-icons/bi"

type TForm = { content: string; title: string }

const CommentsSection = () => {
	const params = useParams()
	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm<TForm>()

	const onSubmit = async (data: TForm) => {
		try {
			const res = await addComment(params.id!, data.title, data.content)
			toast.success(res.data.message)
		} catch (error: Error | any) {
			console.log(error)
			return toast.error(
				error.response.data.message ||
					"Произошла ошибка при добавлении комментария."
			)
		}
	}

	const delComment = async (commentId: number) => {
		try {
			const res = await deleteComment(params.id!, commentId)
			toast.success(res.data.message)
		} catch (error: Error | any) {
			console.log(error)
			return toast.error(
				error.response.data.message ||
					"Произошла ошибка при удалении комментария."
			)
		}
	}

	return (
		<div>
			<h3 className="text-lg font-bold mb-4">Комментарии</h3>
			<div className="flex gap-4">
				<aside className="w-2/5">
					<span className="font-light">Оставьте здесь свой комментарий.</span>
					<form onSubmit={handleSubmit(onSubmit)} id="commentForm">
						<InputTextUI
							placeholder="Заголовок"
							register={register("title", { required: true })}
						/>
						{errors.content && (
							<span className="text-red-500 text-sm">
								Поле обязательно для заполнения.
							</span>
						)}
						<TextareaUI
							classNames="mt-4"
							placeholder="Ваш комментарий"
							register={register("content", { required: true })}
						/>
						{errors.title && (
							<span className="text-red-500 text-sm">
								Поле обязательно для заполнения.
							</span>
						)}
					</form>
					<ButtonUI
						className="w-full mt-4 text-blue-500 bg-white border-2 border-blue-500 py-3"
						children="Отправить"
						form="commentForm"
					/>
				</aside>
				<section className="w-2/3">
					{Item.oneItem.UserComments.length === 0 ? (
						<p>Пока что никто не оставил ни одного комментария.</p>
					) : (
						Item.oneItem.UserComments.map(comment => (
							<div
								key={comment.id}
								className="p-2 relative flex flex-col gap-2 rounded-md bg-zinc-200/20 border border-gray-300/50"
							>
								<div className="flex items-center gap-2">
									<div className="w-12 h-12 rounded-full bg-blue-500"></div>
									<span className="font-semibold text-lg">
										{comment.User.username}
									</span>
								</div>
								<span className="text-md border-b">{comment.title}</span>
								<p className="font-light">{comment.content}</p>
								{(User.isAdmin || User.user.id === comment.User.id) && (
									<>
										<button
                                            onClick={() => delComment(comment.id)}
											className="absolute top-2 text-red-500/20 right-2"
											title="Удалить"
										>
											<BiTrash size={20} />
										</button>
										<button
											className="absolute top-2 text-blue-500/20 right-10"
											title="Редактировать"
										>
											<BiPencil size={20} />
										</button>
									</>
								)}
							</div>
						))
					)}
				</section>
			</div>
		</div>
	)
}

export default CommentsSection
