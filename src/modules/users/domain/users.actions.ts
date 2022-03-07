import { User } from "@/modules/users/dtos/user.dto"
import { UsersOutput } from "@/modules/users/domain/users.output"

export const getUsers = async ({
	usersOutput,
}: {
	usersOutput: UsersOutput
}): Promise<User[]> => {
	try {
		return await usersOutput.getUsers()
	} catch (error: any) {
		throw new Error(error)
	}
}

export const getUser = async ({
	usersOutput,
}: {
	usersOutput: UsersOutput
}): Promise<User | null> => {
	try {
		return await usersOutput.getUser()
	} catch (error: any) {
		throw new Error(error)
	}
}

export const addUser = async ({
	usersOutput,
	id,
	username,
	created_at,
}: {
	usersOutput: UsersOutput
	id: string
	username: string
	created_at: Date
}): Promise<User[]> => {
	try {
		return await usersOutput.addUser({ id, username, created_at })
	} catch (error: any) {
		throw new Error(error)
	}
}

export const followUser = async ({
	usersOutput,
	user_id,
}: {
	usersOutput: UsersOutput
	user_id: string
}): Promise<void> => {
	try {
		return await usersOutput.followUser({ user_id })
	} catch (error: any) {
		throw new Error(error)
	}
}

export const unfollowUser = async ({
	usersOutput,
	user_id,
}: {
	usersOutput: UsersOutput
	user_id: string
}): Promise<void> => {
	try {
		return await usersOutput.unfollowUser({ user_id })
	} catch (error: any) {
		throw new Error(error)
	}
}
