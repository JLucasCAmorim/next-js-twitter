import { User } from "../../../users/dtos/user.dto"
import { Post } from "../../dtos/post.dto"
import PostItemView from "../post-item/post-item.view"

interface PostUserListViewProps {
	posts: Post[]
	user: User | null
	repost: (user: User, post: Post) => Promise<void>
}

const PostUserListView = ({ posts, user, repost }: PostUserListViewProps) => {
	return (
		<>
			{posts.map((post) => (
				<PostItemView
					key={post.id}
					post={post}
					user={user}
					repost={repost}
				/>
			))}
		</>
	)
}

export default PostUserListView
