import { User } from "../../users/dtos/user.dto"

export interface Post {
	id: string
	content: string
	user_id: string
	quote?: string
	type: string
	created_at: Date
	user: User
	post?: Post
}

export interface AddPostDto {
	readonly id: string
	readonly content: string
	readonly user_id: string
	readonly quote?: string
	readonly type: string
	readonly created_at: Date
	readonly user: User
	readonly post?: Post
}
