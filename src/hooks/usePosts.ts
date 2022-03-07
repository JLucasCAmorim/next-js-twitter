import PostContext, { PostContextProps } from "@/contexts/PostContext"
import { useContextSelector } from "use-context-selector"

export const usePosts = (): PostContextProps => {
	const posts = useContextSelector(PostContext, (context) => context.posts)

	const filteredPosts = useContextSelector(
		PostContext,
		(context) => context.filteredPosts
	)

	const userPosts = useContextSelector(
		PostContext,
		(context) => context.userPosts
	)

	const search = useContextSelector(PostContext, (context) => context.search)

	const loading = useContextSelector(
		PostContext,
		(context) => context.loading
	)

	const createPost = useContextSelector(
		PostContext,
		(context) => context.createPost
	)

	const loadAllPosts = useContextSelector(
		PostContext,
		(context) => context.loadAllPosts
	)

	const loadUserPosts = useContextSelector(
		PostContext,
		(context) => context.loadUserPosts
	)

	const repost = useContextSelector(PostContext, (context) => context.repost)

	return {
		posts,
		filteredPosts,
		userPosts,
		loading,
		createPost,
		loadAllPosts,
		loadUserPosts,
		repost,
		search,
	}
}
