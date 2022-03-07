import { UsersOutput } from "@/modules/users/domain/users.output"
import { AddUserDto, FollowUserDto, User } from "@/modules/users/dtos/user.dto"

export class UsersLocalStorage implements UsersOutput {
	getLocalUser(): User {
		const localUser: string | null = localStorage.getItem("user")

		return localUser ? JSON.parse(localUser) : null
	}

	getLocalUsers(): User[] {
		const localUsers: string | null = localStorage.getItem("users")

		return localUsers ? JSON.parse(localUsers) : []
	}

	setLocalUsers(users: User[]): void {
		localStorage.setItem("users", JSON.stringify(users))
	}

	setLocalUser(user: User): void {
		localStorage.setItem("user", JSON.stringify(user))
	}

	getUser(): Promise<User | null> {
		const user: User = this.getLocalUser()

		return Promise.resolve(user)
	}

	getUsers(): Promise<User[]> {
		const users: User[] = this.getLocalUsers()

		return Promise.resolve(users)
	}

	followUser({ user_id }: FollowUserDto): Promise<void> {
		return this.getUsers().then((users: User[]) => {
			const checkIfUserExists = users.find((user) => user.id === user_id)
			if (!checkIfUserExists) {
				throw new Error("An error occurred while following the user")
			}
			return this.getUser().then((user: User | null) => {
				const currentUser = user
				if (currentUser && currentUser.id === user_id) {
					throw new Error("A user cannot follow himself")
				}
				if (
					currentUser &&
					!currentUser.following?.includes(user_id) &&
					currentUser.id !== user_id
				) {
					currentUser.following?.push(user_id)
					checkIfUserExists.followers?.push(user.id)
					const updateUsers = users.map((user) => {
						if (user.id === checkIfUserExists.id)
							user = checkIfUserExists
						if (user.id === currentUser.id) user = currentUser
						return user
					})
					this.setLocalUsers(updateUsers)
					this.setLocalUser(currentUser)
					return Promise.resolve()
				}
			})
		})
	}

	unfollowUser({ user_id }: FollowUserDto): Promise<void> {
		return this.getUsers().then((users: User[]) => {
			const checkIfUserExists = users.find((user) => user.id === user_id)
			if (!checkIfUserExists) {
				throw new Error("An error occurred while following the user")
			}
			return this.getUser().then((user: User | null) => {
				const currentUser = user
				if (currentUser && currentUser.following?.includes(user_id)) {
					currentUser.following = currentUser.following?.filter(
						(follower) => follower !== user_id
					)
					checkIfUserExists.followers =
						checkIfUserExists.followers?.filter(
							(follower) => follower !== currentUser.id
						)
					const updateUsers = users.map((user) => {
						if (user.id === checkIfUserExists.id)
							user = checkIfUserExists
						if (user.id === currentUser.id) user = currentUser
						return user
					})
					this.setLocalUsers(updateUsers)
					this.setLocalUser(currentUser)
					return Promise.resolve()
				}
			})
		})
	}

	addUser({ id, username, created_at }: AddUserDto): Promise<User[]> {
		return this.getUsers().then((users: User[]) => {
			const user: User = {
				id,
				username,
				followers: [],
				following: [],
				created_at,
			}

			users.push(user)

			this.setLocalUser(user)
			this.setLocalUsers(users)

			return Promise.resolve(users)
		})
	}
}
