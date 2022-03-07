import Image from "next/image"
import { useForm } from "react-hook-form"
import CircularProgress from "@/components/CircularProgress"
import { User } from "../../../users/dtos/user.dto"
import { usePosts } from "../../../../hooks/usePosts"
import { useUsers } from "../../../../hooks/useUsers"

type FormData = {
	content: string
	user_id: string
	user: User | null
}

export const AddPostForm = () => {
	const { user } = useUsers()
	const { createPost } = usePosts()
	const postContentMaxLength = 777
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			content: "",
			user_id: user?.id,
			user,
		},
	})

	const onSubmit = handleSubmit(async (data) => {
		if (user) {
			await createPost({
				content: data.content,
				type: "post",
				user: user,
				user_id: user.id,
				created_at: new Date(),
			})
			reset()
		}
	})

	return (
		<form onSubmit={onSubmit}>
			<div className="flex">
				<div className="m-2 w-10 py-1 ">
					<div className="inline-block h-10 w-10 relative">
						<Image
							layout="fill"
							className="rounded-full"
							src={"/img/avatar-dev.png"}
							alt="avatar"
						/>
					</div>
				</div>
				<div className="flex-1 px-2 pt-2 mt-2 border-1 border-gray-600">
					<textarea
						className="scrollbar bg-transparent text-gray-400 font-medium text-lg w-full"
						rows={2}
						cols={50}
						placeholder="What's happening?"
						{...register("content", {
							required: true,
							maxLength: postContentMaxLength,
						})}
					></textarea>
					{errors.content && errors.content.type === "maxLength" && (
						<span className="m-2.5 text-red-400" role="alert">
							Max length exceeded
						</span>
					)}
				</div>
			</div>
			<div className="flex">
				<div className="w-10"></div>
				<div className="w-64 px-2">
					<div className="flex items-center">
						<div className="flex-1 px-1 bottom-5 m-2 w-14 h-14">
							{watch("content").length > 0 && (
								<CircularProgress
									value={watch("content").length}
									limit={postContentMaxLength}
								/>
							)}
						</div>
					</div>
				</div>
				<div className="flex-1">
					<button
						type="submit"
						className="bg-blue-400 mt-5 mb-2 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full mr-8 float-right"
					>
						Post
					</button>
				</div>
			</div>

			<hr className="border-blue-800 border-4" />
		</form>
	)
}
