import { useState, ReactNode, useCallback } from "react"

import { createContext } from "use-context-selector"
import { Post } from "../modules/posts/dtos/post.dto"
import { outputs } from "../config/outputs"
import { v4 as uuidv4 } from "uuid"
import {
	addPost,
	getPosts,
	getUserPosts,
} from "@/modules/posts/domain/posts.actions"
import { mapToApplicationModel } from "@/modules/posts/application/posts.mapper"
import { User } from "../modules/users/dtos/user.dto"

interface CreatePost {
	content: string
	user_id: string
	quote?: string
	type: string
	created_at: Date
	user: User
	post?: Post
}

export interface PostContextProps {
	posts: Post[]
	userPosts: Post[]
	filteredPosts: Post[]
	loading: boolean
	createPost: (data: CreatePost) => Promise<void>
	loadAllPosts: () => Promise<void>
	loadUserPosts: (user_id: string | undefined) => Promise<void>
	repost: (user: User, post: Post) => Promise<void>
	search: ({
		query,
		user_id,
	}: {
		query: string
		user_id?: string
	}) => Promise<void>
}

const PostContext = createContext<PostContextProps>({} as PostContextProps)

export default PostContext

export const PostProvider = ({ children }: { children: ReactNode }) => {
	const [posts, setPosts] = useState<Post[]>([])
	const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
	const [userPosts, setUserPosts] = useState<Post[]>([])
	const [loading, setLoading] = useState<boolean>(false)

	const loadAllPosts = useCallback(async (): Promise<void> => {
		try {
			setLoading(true)
			const postsDomain: Post[] = await getPosts({
				postsOutput: outputs.postsOutput,
			})

			const posts: Post[] = mapToApplicationModel(postsDomain)

			setPosts(posts)
			setLoading(false)
			setFilteredPosts([])
		} catch {}
	}, [])

	const loadUserPosts = useCallback(
		async (user_id: string | undefined): Promise<void> => {
			try {
				if (user_id) {
					setLoading(true)
					const postsDomain: Post[] = await getUserPosts({
						postsOutput: outputs.postsOutput,
						user_id,
					})

					const posts: Post[] = mapToApplicationModel(postsDomain)
					setUserPosts(posts)
					setLoading(false)
					setFilteredPosts([])
				}
			} catch {}
		},
		[]
	)

	const createPost = useCallback(
		async (data: CreatePost): Promise<void> => {
			try {
				const posts = await addPost({
					postsOutput: outputs.postsOutput,
					id: uuidv4(),
					content: data.content,
					type: data.type,
					user_id: data.user_id,
					quote: data.quote,
					user: data.user,
					created_at: data.created_at,
					post: data.post,
				})

				setPosts(posts)
				loadUserPosts(data.user_id)
				setFilteredPosts([])
			} catch {}
		},
		[loadUserPosts]
	)

	const search = useCallback(
		async ({ query, user_id }): Promise<void> => {
			try {
				const term = new RegExp(query, "gi")
				if (query) {
					if (user_id) {
						const postsFiltered = posts.filter(
							(postItem) =>
								postItem.content.search(term) !== -1 &&
								postItem.type === "post" &&
								postItem.user_id === user_id
						)

						setFilteredPosts(postsFiltered)
					} else {
						const postsFiltered = posts.filter(
							(postItem) =>
								postItem.content.search(term) !== -1 &&
								postItem.type === "post"
						)

						setFilteredPosts(postsFiltered)
					}
				} else {
					setFilteredPosts([])
				}
			} catch {}
		},
		[posts]
	)

	const repost = useCallback(
		async (user, post): Promise<void> => {
			try {
				const posts = await addPost({
					postsOutput: outputs.postsOutput,
					id: uuidv4(),
					content: post.content,
					type: "repost",
					user_id: user.id,
					user,
					created_at: new Date(),
				})

				setPosts(posts)
				loadUserPosts(user.id)
			} catch {}
		},
		[loadUserPosts]
	)

	return (
		<PostContext.Provider
			value={{
				posts,
				userPosts,
				filteredPosts,
				loading,
				createPost,
				loadAllPosts,
				loadUserPosts,
				repost,
				search,
			}}
		>
			{children}
		</PostContext.Provider>
	)
}
