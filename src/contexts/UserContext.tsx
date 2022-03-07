import { useState, ReactNode, useCallback, useEffect } from "react"

import { createContext } from "use-context-selector"
import { User } from "../modules/users/dtos/user.dto"
import { outputs } from "../config/outputs"
import { v4 as uuidv4 } from "uuid"
import {
	addUser,
	getUsers,
	followUser,
	getUser,
	unfollowUser,
} from "@/modules/users/domain/users.actions"
import { mapUserToApplicationModel } from "@/modules/users/application/users.mapper"

interface CreateUser {
	username: string
	followers?: string[]
	following?: string[]
	created_at: Date
}

export interface UserContextProps {
	users: User[]
	user: User | null
	loading: boolean
	createUser: (data: CreateUser) => Promise<void>
	loadAllUsers: () => Promise<void>
	loadUser: () => Promise<void>
	follow: (user_id: string) => Promise<void>
	unfollow: (user_id: string) => Promise<void>
}

const UserContext = createContext<UserContextProps>({} as UserContextProps)

export default UserContext

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [users, setUsers] = useState<User[]>([])
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

	const loadAllUsers = useCallback(async (): Promise<void> => {
		try {
			setLoading(true)
			const usersDomain: User[] = await getUsers({
				usersOutput: outputs.usersOutput,
			})

			let users: User[] = mapUserToApplicationModel(usersDomain)

			if (user) {
				users = users.filter((userItem) => userItem.id !== user.id)
			}

			setUsers(users)
			setLoading(false)
		} catch {}
	}, [user])

	const loadUser = useCallback(async (): Promise<void> => {
		try {
			setLoading(true)
			const user: User | null = await getUser({
				usersOutput: outputs.usersOutput,
			})

			setUser(user)
			setLoading(false)
		} catch {}
	}, [])

	const createUser = useCallback(
		async (data: CreateUser): Promise<void> => {
			try {
				const users = await addUser({
					usersOutput: outputs.usersOutput,
					id: uuidv4(),
					username: data.username,
					created_at: data.created_at,
				})
				setUsers(users)
				loadUser()
			} catch {}
		},
		[loadUser]
	)

	const follow = useCallback(async (user_id: string): Promise<void> => {
		try {
			await followUser({
				usersOutput: outputs.usersOutput,
				user_id,
			})
		} catch {}
	}, [])

	const unfollow = useCallback(async (user_id: string): Promise<void> => {
		try {
			await unfollowUser({
				usersOutput: outputs.usersOutput,
				user_id,
			})
		} catch {}
	}, [])

	useEffect(() => {
		loadUser()
	}, [loadUser])

	return (
		<UserContext.Provider
			value={{
				users,
				user,
				loading,
				createUser,
				loadAllUsers,
				loadUser,
				follow,
				unfollow,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}
