import { PostsLocalStorage } from "@/modules/posts/infra/posts.local-storage"
import { UsersLocalStorage } from "@/modules/users/infra/users.local-storage"

export const outputs = {
	postsOutput: new PostsLocalStorage(),
	usersOutput: new UsersLocalStorage(),
}
