import { useEffect } from "react"
import { usePosts } from "../../../../hooks/usePosts"
import { useUsers } from "../../../../hooks/useUsers"
import PostItemView from "../post-item/post-item.view"

const PostListView = () => {
	const { user } = useUsers()
	const { posts, filteredPosts, loadAllPosts, repost } = usePosts()

	useEffect(() => {
		loadAllPosts()
	}, [loadAllPosts])

	return filteredPosts.length > 0 ? (
		<>
			{filteredPosts.map((post) => (
				<PostItemView
					key={post.id}
					post={post}
					repost={repost}
					user={user}
				/>
			))}
		</>
	) : (
		<>
			{posts.map((post) => (
				<PostItemView
					key={post.id}
					post={post}
					repost={repost}
					user={user}
				/>
			))}
		</>
	)
}

export default PostListView
