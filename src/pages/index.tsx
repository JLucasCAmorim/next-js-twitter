import type { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import { AddPostForm } from "@/modules/posts/application/add-post-form/add-post-form.view"
import UserModalLoginContainer from "@/modules/users/application/user-sign-in/user-modal-login.container"
import PostListView from "../modules/posts/application/post-list/post-list.view"
import { useUsers } from "../hooks/useUsers"
import SearchPostsFormView from "../modules/posts/application/search-posts-form/search-posts-form.view"

const Home: NextPage = () => {
	const { user } = useUsers()
	return (
		<div className="bg-dark-blue">
			<div className="flex">
				<div className="w-2/5 text-white h-12 py-4 ml-2">
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
							<a className="group flex items-center px-2 py-2 text-base leading-6 font-semibold rounded-full bg-gray-800 text-white">
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
						<Link href={"user/profile"}>
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
									<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
								</svg>
								Profile
							</a>
						</Link>
						<Link href={"/"}>
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
					<div className="flex">
						<div className="flex-1 m-2">
							<h2 className="px-4 py-4 text-xl font-semibold text-white">
								Home
							</h2>
						</div>
						<div className="flex-1 px-4 py-2 m-2">
							<a
								href=""
								className=" text-2xl font-medium rounded-full text-white hover:bg-gray-800 hover:text-white float-right"
							>
								<svg
									className="m-2 h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<g>
										<path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path>
									</g>
								</svg>
							</a>
						</div>
					</div>

					<hr className="border-gray-600" />

					{user && <AddPostForm />}
					<PostListView />
				</div>

				<div className="w-2/5 h-12">
					<SearchPostsFormView />

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

export default Home
