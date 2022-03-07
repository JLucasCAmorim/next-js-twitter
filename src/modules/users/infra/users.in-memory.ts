import { UsersOutput } from "@/modules/users/domain/users.output"
import { User, AddUserDto, FollowUserDto } from "@/modules/users/dtos/user.dto"

export class UsersInMemory implements UsersOutput {
	private users: User[] | undefined = []
	private user: User | undefined = {
		id: "",
		username: "",
		followers: [],
		following: [],
		created_at: new Date(),
	}

	setUser(user: User | undefined): void {
		this.user = user ? { ...user } : undefined
	}

	setUsers(users: User[] | undefined): void {
		this.users = users ? [...users] : undefined
	}

	mapToDomainModel(infraModel: User[]): User[] {
		return infraModel.map((infraModel: User) => ({
			id: infraModel.id,
			username: infraModel.username,
			followers: infraModel.followers,
			following: infraModel.following,
			created_at: infraModel.created_at,
		}))
	}

	getUsers(): Promise<User[]> {
		if (!this.users) {
			throw new Error("Please create a user")
		}

		const users: User[] = this.mapToDomainModel(this.users)

		return Promise.resolve(users)
	}

	getUser(): Promise<User> {
		if (!this.user) {
			throw new Error("Please create a user")
		}

		const user: User = this.user

		return Promise.resolve(user)
	}

	followUser({ user_id }: FollowUserDto): Promise<void> {
		if (!this.users) {
			throw new Error("An error occurred while following the user")
		}
		const checkIfUserExists = this.users.find((user) => user.id === user_id)
		if (!checkIfUserExists) {
			throw new Error("An error occurred while following the user")
		}
		const currentUser = this.user
		if (currentUser && currentUser.id === user_id) {
			throw new Error("A user cannot follow himself")
		}
		if (currentUser && !currentUser.following?.includes(user_id)) {
			currentUser.following?.push(user_id)
			checkIfUserExists.followers?.push(currentUser.id)
			const updateUsers = this.users.map((user) => {
				if (user.id === checkIfUserExists.id) user = checkIfUserExists
				if (user.id === currentUser.id) user = currentUser
				return user
			})
			this.users = updateUsers
		}
		return Promise.resolve()
	}

	unfollowUser({ user_id }: FollowUserDto): Promise<void> {
		if (!this.users) {
			throw new Error("An error occurred while following the user")
		}
		const checkIfUserExists = this.users.find((user) => user.id === user_id)
		if (!checkIfUserExists) {
			throw new Error("The user that you want to follow doesnt exist")
		}
		const currentUser = this.user
		if (currentUser && currentUser.following?.includes(user_id)) {
			currentUser.following = currentUser.following?.filter(
				(follower) => follower !== user_id
			)
			checkIfUserExists.followers = checkIfUserExists.followers?.filter(
				(follower) => follower !== currentUser.id
			)
			const updateUsers = this.users.map((user) => {
				if (user.id === checkIfUserExists.id) user = checkIfUserExists
				if (user.id === currentUser.id) user = currentUser
				return user
			})
			this.users = updateUsers
		}
		return Promise.resolve()
	}

	addUser({ id, username, created_at }: AddUserDto): Promise<User[]> {
		if (!this.users)
			throw new Error("An error occurred while adding the user")

		const user: User = {
			id,
			username,
			created_at,
			followers: [],
			following: [],
		}

		this.users.push(user)
		this.user = user

		const users: User[] = this.mapToDomainModel(this.users)

		return Promise.resolve(users)
	}
}
