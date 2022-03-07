import { format } from "date-fns"
import Image from "next/image"
import { User } from "../../dtos/user.dto"

interface UserProfileViewProps {
	user: User | null
}

const UserProfileView = ({ user }: UserProfileViewProps) => {
	return (
		<div>
			<div className="w-full bg-cover bg-no-repeat bg-center h-40 relative">
				<Image
					className="opacity-0"
					src="https://pbs.twimg.com/profile_banners/2161323234/1585151401/600x200"
					alt=""
					layout="fill"
				/>
			</div>
			<div className="p-4">
				<div className="relative flex w-full">
					<div className="flex flex-1">
						<div className="mt-[-6rem]">
							<div className="h-[9rem] w-[9rem] md rounded-full relative avatar">
								<Image
									className="md rounded-full  border-4 border-gray-900"
									src="/img/john.jpeg"
									alt=""
									layout="fill"
								/>
								<div className="absolute"></div>
							</div>
						</div>
					</div>
				</div>

				<div className="space-y-1 justify-center w-full mt-3 ml-3">
					<div>
						<h2 className="text-xl leading-6 font-bold text-white">
							{user?.username || "John.dev"}
						</h2>
						<p className="text-sm leading-5 font-medium text-gray-600">
							@{user?.username || "JohnProgrammer"}
						</p>
					</div>

					<div className="mt-3">
						<p className="text-white leading-tight mb-2">
							Software Engineer / Designer / Entrepreneur <br />
							Visit my github{" "}
						</p>
						<div className="text-gray-600 flex">
							<span className="flex mr-2">
								<a
									href="https://github.com/JLucasCAmorim"
									target="#"
									className="leading-5 ml-1 text-blue-400"
								>
									https://github.com/JLucasCAmorim
								</a>
							</span>
							<span className="flex mr-2">
								<svg
									viewBox="0 0 24 24"
									className="h-5 w-5 paint-icon"
								>
									<g>
										<path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"></path>
										<circle
											cx="7.032"
											cy="8.75"
											r="1.285"
										></circle>
										<circle
											cx="7.032"
											cy="13.156"
											r="1.285"
										></circle>
										<circle
											cx="16.968"
											cy="8.75"
											r="1.285"
										></circle>
										<circle
											cx="16.968"
											cy="13.156"
											r="1.285"
										></circle>
										<circle
											cx="12"
											cy="8.75"
											r="1.285"
										></circle>
										<circle
											cx="12"
											cy="13.156"
											r="1.285"
										></circle>
										<circle
											cx="7.032"
											cy="17.486"
											r="1.285"
										></circle>
										<circle
											cx="12"
											cy="17.486"
											r="1.285"
										></circle>
									</g>
								</svg>{" "}
								<span className="text-sm leading-5 ml-1">
									{`Joined ${
										user?.created_at
											? format(
													new Date(user?.created_at),
													"PP"
											  )
											: ""
									}`}
								</span>
							</span>
						</div>
					</div>
					<div className="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
						<div className="text-center pr-3">
							<span className="font-bold text-white">
								{user?.following?.length}
							</span>
							<span className="text-gray-600"> Following</span>
						</div>
						<div className="text-center px-3">
							<span className="font-bold text-white">
								{user?.followers?.length}
							</span>
							<span className="text-gray-600"> Followers</span>
						</div>
					</div>
				</div>
			</div>
			<hr className="border-gray-800" />
		</div>
	)
}

export default UserProfileView
