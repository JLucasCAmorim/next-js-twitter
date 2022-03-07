import { format } from "date-fns"
import Image from "next/image"
import { useForm } from "react-hook-form"
import CircularProgress from "../../../../components/CircularProgress"
import { usePosts } from "../../../../hooks/usePosts"
import { User } from "../../../users/dtos/user.dto"
import { Post } from "../../dtos/post.dto"

interface AddQuotePostFormViewProps {
	onClose: () => void
	user: User | null
	post: Post
}

type FormData = {
	quote: string
	user_id: string
	user: User | null
}

const AddQuotePostFormView = ({
	onClose,
	user,
	post,
}: AddQuotePostFormViewProps) => {
	const postFormatedDate = post.created_at
		? format(new Date(post.created_at), "PP")
		: ""
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
			quote: "",
			user_id: user?.id,
			user,
		},
	})

	const onSubmit = handleSubmit(async (data) => {
		if (user) {
			await createPost({
				content: post.content,
				type: "repost",
				quote: data.quote,
				user: user,
				user_id: user.id,
				created_at: new Date(),
				post: post,
			})
			reset()
			onClose()
		}
	})

	return (
		<div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
			<div className="relative w-2/3 my-6 mx-auto max-w-3xl">
				<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none">
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
									className="scrollbar bg-gray-600 text-gray-400 font-medium text-lg w-full"
									rows={2}
									cols={50}
									placeholder=" What's your comment?"
									{...register("quote", {
										required: true,
										maxLength: postContentMaxLength,
									})}
								></textarea>
								{errors.quote &&
									errors.quote.type === "maxLength" && (
										<span
											className="m-2.5 text-red-400"
											role="alert"
										>
											Max length exceeded
										</span>
									)}
							</div>
						</div>
						<div className="flex">
							<div className="w-10"></div>
							<div className="w-64 px-2">
								<div className="flex items-center">
									<div className=" px-1 bottom-5 m-2 w-14 h-14">
										{watch("quote").length > 0 && (
											<CircularProgress
												value={watch("quote").length}
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
						<div className="mt-5 w-auto border border-gray-600 h-auto border-b-0">
							<div className="flex flex-shrink-0 p-4 pb-0">
								<div className="flex-shrink-0 group block">
									<div className="flex items-center">
										<div className="h-10 w-10 relative">
											<Image
												layout="fill"
												className="rounded-full"
												src={"/img/avatar-dev.png"}
												alt="avatar"
											/>
										</div>
										<div className="ml-3">
											<p className="text-base leading-6 font-medium text-white">
												{post.user?.username}
												<span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
													{`@${post.user?.username} - ${postFormatedDate}`}
												</span>
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="pl-16">
								<p className="text-base text-left width-auto font-medium text-white flex-shrink pb-5">
									{post.content}
								</p>
							</div>
						</div>

						<div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
							<button
								className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
								type="button"
								onClick={() => onClose()}
							>
								Close
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default AddQuotePostFormView
