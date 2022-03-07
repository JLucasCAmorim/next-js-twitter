import { User } from "../dtos/user.dto"

export const mapUserToApplicationModel = (users: User[]): User[] => {
	return users.map((user: User) => ({
		id: user.id,
		username: user.username,
		followers: user.followers,
		following: user.following,
		created_at: user.created_at,
	}))
}
