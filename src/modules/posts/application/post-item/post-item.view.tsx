import Image from "next/image"
import { Post } from "../../dtos/post.dto"
import { format } from "date-fns"
import { memo } from "react"
import { User } from "../../../users/dtos/user.dto"
import AddQuotePostModalContainer from "../add-quote-post-form/add-quote-post-modal.container"

interface PostItemViewProps {
	post: Post
	user: User | null
	repost: (user: User, post: Post) => Promise<void>
}

const PostItemView = ({ post, user, repost }: PostItemViewProps) => {
	const postFormatedDate = post.created_at
		? format(new Date(post.created_at), "PP")
		: ""

	const onRepostHandle = async () => {
		if (user) {
			await repost(user, post)
		}
	}

	return !post.quote ? (
		<>
			<div className="flex flex-shrink-0 p-4 pb-0">
				<a href="#" className="flex-shrink-0 group block">
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
				</a>
			</div>
			<div className="pl-16">
				<p className="text-base break-words break-all width-auto font-medium text-white flex-shrink">
					{post.content}
				</p>

				<div className="flex">
					<div className="w-full">
						<div className="flex items-center">
							<div className=" text-center">
								<AddQuotePostModalContainer post={post} />
							</div>

							<div className="flex-1 text-center py-2 m-2">
								<button
									type="button"
									onClick={() => onRepostHandle()}
									className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-white"
								>
									<svg
										className="text-center h-7 w-6"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<hr className="border-gray-600" />
		</>
	) : (
		<>
			<div className="flex flex-shrink-0 p-4 pb-0">
				<a href="#" className="flex-shrink-0 group block">
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
									{`@${post.user?.username} - ${
										post.post?.created_at
											? format(
													new Date(
														post.post?.created_at
													),
													"PP"
											  )
											: ""
									}`}
								</span>
							</p>
						</div>
					</div>
				</a>
			</div>
			<div className="pl-16">
				<p className="text-base break-words break-all width-auto font-medium text-white flex-shrink">
					{post.quote}
				</p>

				<div className="mr-5 mt-5 w-auto border border-gray-600 h-auto">
					<div className="flex flex-shrink-0 p-4 pb-0">
						<a href="#" className="flex-shrink-0 group block">
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
										{post.post?.user?.username}
										<span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
											{`@${post.post?.user?.username} - ${postFormatedDate}`}
										</span>
									</p>
								</div>
							</div>
						</a>
					</div>
					<div className="pl-16 mb-5">
						<p className="break-words break-all text-base width-auto font-medium text-white flex-shrink">
							{post.content}
						</p>
					</div>
				</div>
				<div className="flex">
					<div className="w-full">
						<div className="flex items-center">
							<div className=" text-center">
								<AddQuotePostModalContainer post={post} />
							</div>

							<div className="flex-1 text-center py-2 m-2">
								<button
									type="button"
									onClick={() => onRepostHandle()}
									className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-white"
								>
									<svg
										className="text-center h-7 w-6"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<hr className="border-gray-600" />
		</>
	)
}

export default memo(PostItemView)
