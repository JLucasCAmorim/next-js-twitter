import Image from "next/image"
import { outputs } from "@/config/outputs"
import { followUser, unfollowUser } from "../../domain/users.actions"
import { User } from "../../dtos/user.dto"
import { memo } from "react"

interface UserItemViewProps {
	user: User
	currentUser: User | null
}

const UserItemView = ({ user, currentUser }: UserItemViewProps) => {
	const checkFollowHandle = () => {
		if (!currentUser?.following) return false
		return currentUser?.following.includes(user.id)
	}

	const onFollowHandle = async () => {
		await followUser({
			usersOutput: outputs.usersOutput,
			user_id: user.id,
		})
	}

	const onUnfollowHandle = async () => {
		await unfollowUser({
			usersOutput: outputs.usersOutput,
			user_id: user.id,
		})
	}

	const renderFollowButtons = () => {
		if (currentUser) {
			return checkFollowHandle() ? (
				<button
					type="button"
					onClick={() => onUnfollowHandle()}
					className="bg-red-500 hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded-full"
				>
					Unfollow
				</button>
			) : (
				<button
					type="button"
					onClick={() => onFollowHandle()}
					className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded-full"
				>
					Follow
				</button>
			)
		}
		return null
	}

	return (
		<>
			<div className="flex flex-shrink-0">
				<div className="flex-1 ">
					<div className="flex items-center w-48">
						<div className="h-10 w-auto relative">
							<Image
								className="inline-block rounded-full ml-4 mt-2"
								src="/img/avatar-dev.png"
								alt=""
								layout="fill"
							/>
						</div>
						<div className="ml-3 mt-3">
							<p className="text-base leading-6 font-medium text-white">
								{user.username}
							</p>
							<p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
								{`@${user.username}`}
							</p>
						</div>
					</div>
				</div>
				<div className="flex-1 px-4 py-2 m-2">
					<a href="" className=" float-right">
						{renderFollowButtons()}
					</a>
				</div>
			</div>
			<hr className="border-gray-600" />
		</>
	)
}

export default memo(UserItemView)
