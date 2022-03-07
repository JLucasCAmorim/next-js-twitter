import UserContext, { UserContextProps } from "@/contexts/UserContext"
import { useContextSelector } from "use-context-selector"

export const useUsers = (): UserContextProps => {
	const user = useContextSelector(UserContext, (context) => context.user)

	const users = useContextSelector(UserContext, (context) => context.users)

	const loading = useContextSelector(
		UserContext,
		(context) => context.loading
	)

	const createUser = useContextSelector(
		UserContext,
		(context) => context.createUser
	)

	const loadAllUsers = useContextSelector(
		UserContext,
		(context) => context.loadAllUsers
	)

	const loadUser = useContextSelector(
		UserContext,
		(context) => context.loadUser
	)

	const follow = useContextSelector(UserContext, (context) => context.follow)

	const unfollow = useContextSelector(
		UserContext,
		(context) => context.unfollow
	)

	return {
		user,
		users,
		loading,
		createUser,
		loadAllUsers,
		loadUser,
		follow,
		unfollow,
	}
}
