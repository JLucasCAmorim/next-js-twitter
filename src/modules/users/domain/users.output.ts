import { AddUserDto, FollowUserDto, User } from "@/modules/users/dtos/user.dto"

export interface UsersOutput {
	getUser(): Promise<User | null>
	getUsers(): Promise<User[]>
	addUser(data: AddUserDto): Promise<User[]>
	followUser(data: FollowUserDto): Promise<void>
	unfollowUser(data: FollowUserDto): Promise<void>
}
