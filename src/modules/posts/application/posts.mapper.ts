import { Post } from "../dtos/post.dto"

export const mapToApplicationModel = (posts: Post[]): Post[] => {
	return posts.map((post: Post) => ({
		id: post.id,
		content: post.content,
		type: post.type,
		user: post.user,
		user_id: post.user_id,
		created_at: post.created_at,
		post: post.post,
		quote: post.quote,
	}))
}
