import { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import PostUserListView from "../../modules/posts/application/post-user-list/post-user-list.view"
import UserModalLoginContainer from "../../modules/users/application/user-sign-in/user-modal-login.container"
import UserProfile from "../../modules/users/application/user-profile/user-profile.view"
import UserListView from "../../modules/users/application/user-list/user-list.view"
import { AddPostForm } from "../../modules/posts/application/add-post-form/add-post-form.view"
import { useUsers } from "@/hooks/useUsers"
import { usePosts } from "../../hooks/usePosts"
import SearchPostsFormView from "../../modules/posts/application/search-posts-form/search-posts-form.view"

const Profile: NextPage = () => {
	const { user } = useUsers()
	const { filteredPosts, userPosts, loadUserPosts, repost } = usePosts()

	useEffect(() => {
		loadUserPosts(user?.id)
	}, [loadUserPosts, user?.id])

	return (
		<div className="bg-dark-blue">
			<div className="flex">
				<div className="w-2/5 text-white h-full py-4 ml-2">
					{user && (
						<div className="flex-shrink-0 flex hover:bg-gray-800 rounded-full p-4 mr-2">
							<a href="#" className="flex-shrink-0 group block">
								<div className="flex items-center">
									<div className="h-10 w-10 relative">
										<Image
											layout="fill"
											className="inline-block rounded-full"
											src="/img/avatar-dev.png"
											alt="profile"
										/>
									</div>
									<div className="ml-3">
										<p className="text-base leading-6 font-medium text-white">
											{user?.username}
										</p>
										<p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
											{`@${user?.username || ""}`}
										</p>
									</div>
								</div>
							</a>
						</div>
					)}

					<nav className="mt-5 px-2">
						<Link href={"/"}>
							<a className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-white">
								<svg
									className="mr-4 h-6 w-6 "
									stroke="currentColor"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"
									/>
								</svg>
								Home
							</a>
						</Link>
						<Link href={"/user/profile"}>
							<a className="group flex items-center px-2 py-2 text-base leading-6 font-semibold rounded-full bg-gray-800 text-white">
								<svg
									className="mr-4 h-6 w-6"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
								</svg>
								Profile
							</a>
						</Link>
						<Link href={"/user/profile"}>
							<a className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-white">
								<svg
									className="mr-4 h-6 w-6"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
								</svg>
								More
							</a>
						</Link>
						<UserModalLoginContainer />
					</nav>
				</div>

				<div className="w-3/5 border border-gray-600 h-auto  border-t-0">
					<div>
						<div className="flex justify-start">
							<div className="px-2 py-2 mx-2">
								<Link href={"/"}>
									<a className=" text-2xl font-medium rounded-full text-blue-400 hover:bg-gray-800 hover:text-blue-300 float-right">
										<svg
											className="m-2 h-6 w-6"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<g>
												<path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
											</g>
										</svg>
									</a>
								</Link>
							</div>
							<div className="mx-2 py-2">
								<h2 className="mb-0 text-xl font-bold text-white">
									{user?.username}
								</h2>
								<p className="mb-0 w-48 text-xs text-gray-400">
									{`${userPosts.length} Posterrs`}
								</p>
							</div>
						</div>
						<hr className="border-gray-600" />
					</div>
					<UserProfile user={user} />
					<hr className="border-gray-600" />
					{user && <AddPostForm />}
					<PostUserListView
						posts={
							filteredPosts.length > 0 ? filteredPosts : userPosts
						}
						user={user}
						repost={repost}
					/>
				</div>

				<div className="w-2/5 h-12">
					<SearchPostsFormView user_id={user?.id} />

					<UserListView />

					<div className="flow-root m-6">
						<div className="flex-1">
							<a href="#">
								<p className="text-sm leading-6 font-medium text-gray-500">
									Terms Privacy Policy Cookies Imprint Ads
									info
								</p>
							</a>
						</div>
						<div className="flex-2">
							<p className="text-sm leading-6 font-medium text-gray-600">
								{" "}
								© 2020 Posterr, Inc.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
