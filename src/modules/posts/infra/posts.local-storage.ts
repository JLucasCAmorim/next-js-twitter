import { PostsOutput } from "@/modules/posts/domain/posts.output"
import { AddPostDto, Post } from "@/modules/posts/dtos/post.dto"

export class PostsLocalStorage implements PostsOutput {
	getLocalPosts(): Post[] {
		const localPosts: string | null = localStorage.getItem("posts")

		return localPosts ? JSON.parse(localPosts) : []
	}

	setLocalPosts(posts: Post[]): void {
		localStorage.setItem("posts", JSON.stringify(posts))
	}

	getPosts(): Promise<Post[]> {
		const posts: Post[] = this.getLocalPosts()

		return Promise.resolve(posts)
	}

	getUserPosts(user_id: string): Promise<Post[]> {
		const posts: Post[] = this.getLocalPosts().filter(
			(post) => post.user_id === user_id
		)
		return Promise.resolve(posts)
	}

	addPost({
		id,
		content,
		quote,
		type,
		user_id,
		post: previousPost,
		created_at,
		user,
	}: AddPostDto): Promise<Post[]> {
		return this.getPosts().then((posts: Post[]) => {
			const month = new Date().getMonth()
			const day = new Date().getDate()

			const checkUserPosts = posts.filter((post) => {
				const postMonth = new Date(post.created_at).getMonth()
				const postDay = new Date(post.created_at).getDate()
				return (
					post.user_id === user_id &&
					postMonth === month &&
					postDay === day
				)
			})

			if (checkUserPosts.length >= 5) {
				throw new Error("Cannot add more than 5 posts per day")
			}

			const post: Post = {
				id,
				content,
				user_id,
				quote: quote || "",
				type,
				post: previousPost,
				created_at,
				user,
			}

			posts.push(post)

			this.setLocalPosts(posts)

			return Promise.resolve(posts)
		})
	}
}
