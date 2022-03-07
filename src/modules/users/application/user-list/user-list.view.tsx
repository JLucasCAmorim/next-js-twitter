import { useEffect } from "react"
import { useUsers } from "@/hooks/useUsers"
import UserItemView from "../user-item/user-item.view"

const UserListView = () => {
	const { loadAllUsers, user: currentUser, users } = useUsers()
	useEffect(() => {
		loadAllUsers()
	}, [loadAllUsers])

	return (
		<div className="max-w-sm rounded-lg bg-gray-800 overflow-hidden shadow-lg m-4 mr-20">
			<div className="flex">
				<div className="flex-1 m-2">
					<h2 className="px-4 py-2 text-xl w-48 font-semibold text-white">
						Who to follow
					</h2>
				</div>
			</div>

			<hr className="border-gray-600" />

			{users.map((user) => (
				<UserItemView
					key={user.id}
					user={user}
					currentUser={currentUser}
				/>
			))}

			<div className="flex">
				<div className="flex-1 p-4"></div>
			</div>
		</div>
	)
}

export default UserListView
