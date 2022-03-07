import { AddPostDto, Post } from "@/modules/posts/dtos/post.dto"

export interface PostsOutput {
	getPosts(): Promise<Post[]>
	getUserPosts(user_id: string): Promise<Post[]>
	addPost(data: AddPostDto): Promise<Post[]>
}
