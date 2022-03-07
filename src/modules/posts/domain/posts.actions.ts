import { Post } from "@/modules/posts/dtos/post.dto"
import { PostsOutput } from "@/modules/posts/domain/posts.output"
import { User } from "../../users/dtos/user.dto"

export const getPosts = async ({
	postsOutput,
}: {
	postsOutput: PostsOutput
}): Promise<Post[]> => {
	try {
		return await postsOutput.getPosts()
	} catch (error: any) {
		throw new Error(error)
	}
}

export const getUserPosts = async ({
	postsOutput,
	user_id,
}: {
	postsOutput: PostsOutput
	user_id: string
}): Promise<Post[]> => {
	try {
		return await postsOutput.getUserPosts(user_id)
	} catch (error: any) {
		throw new Error(error)
	}
}

export const addPost = async ({
	postsOutput,
	id,
	content,
	type,
	quote,
	user_id,
	post,
	user,
	created_at,
}: {
	postsOutput: PostsOutput
	id: string
	content: string
	type: string
	quote?: string
	user_id: string
	user: User
	post?: Post
	created_at: Date
}): Promise<Post[]> => {
	try {
		return await postsOutput.addPost({
			id,
			content,
			type,
			quote,
			user_id,
			user,
			post,
			created_at,
		})
	} catch (error: any) {
		throw new Error(error)
	}
}
