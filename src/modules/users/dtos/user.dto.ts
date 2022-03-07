export interface User {
	id: string
	username: string
	followers?: string[]
	following?: string[]
	created_at: Date
}

export interface AddUserDto {
	readonly id: string
	readonly username: string
	readonly created_at: Date
}

export interface FollowUserDto {
	readonly user_id: string
}
