import { PostsOutput } from "@/modules/posts/domain/posts.output"
import { Post, AddPostDto } from "@/modules/posts/dtos/post.dto"

export class PostsInMemory implements PostsOutput {
	private posts: Post[] | undefined = []

	setPosts(posts: Post[] | undefined): void {
		this.posts = posts ? [...posts] : undefined
	}

	mapToDomainModel(infraModel: Post[]): Post[] {
		return infraModel.map((infraModel: Post) => ({
			id: infraModel.id,
			content: infraModel.content,
			type: infraModel.type,
			quote: infraModel.quote,
			user_id: infraModel.user_id,
			post: infraModel.post,
			created_at: infraModel.created_at,
			user: infraModel.user,
		}))
	}

	getPosts(): Promise<Post[]> {
		if (!this.posts) {
			throw new Error("Please create a post")
		}

		const posts: Post[] = this.mapToDomainModel(this.posts)

		return Promise.resolve(posts)
	}

	getUserPosts(user_id: string): Promise<Post[]> {
		if (!this.posts) {
			throw new Error("Please create a post")
		}

		const posts: Post[] = this.mapToDomainModel(this.posts).filter(
			(post) => post.user_id === user_id
		)

		return Promise.resolve(posts)
	}

	addPost({
		id,
		content,
		quote,
		type,
		user,
		user_id,
		post: previousPost,
		created_at,
	}: AddPostDto): Promise<Post[]> {
		if (!this.posts)
			throw new Error("An error occurred while adding the post")

		const month = new Date().getMonth()
		const day = new Date().getDate()
		const checkUserPosts = this.posts.filter((post) => {
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
			created_at,
			post: previousPost,
			user,
		}

		this.posts.push(post)

		const posts: Post[] = this.mapToDomainModel(this.posts)

		return Promise.resolve(posts)
	}
}
