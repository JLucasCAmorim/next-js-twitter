import { ReactNode } from "react"
import { PostProvider } from "./PostContext"
import { UserProvider } from "./UserContext"

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<UserProvider>
			<PostProvider>{children}</PostProvider>
		</UserProvider>
	)
}

export default Providers
