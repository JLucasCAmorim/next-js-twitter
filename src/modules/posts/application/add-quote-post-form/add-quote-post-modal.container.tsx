import { useState } from "react"
import { useUsers } from "../../../../hooks/useUsers"
import { Post } from "../../dtos/post.dto"
import AddQuotePostFormView from "./add-quote-post-form.view"

interface AddQuotePostModalContainerProps {
	post: Post
}

const AddQuotePostModalContainer = ({
	post,
}: AddQuotePostModalContainerProps) => {
	const { user } = useUsers()
	const [showModal, setShowModal] = useState(false)
	const onOpenModal = () => {
		setShowModal(true)
	}
	const onCloseModal = () => {
		setShowModal(false)
	}
	return (
		<>
			<button
				onClick={() => onOpenModal()}
				type="button"
				className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-white"
			>
				<svg
					className="text-center h-6 w-6"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
				</svg>
			</button>
			{showModal ? (
				<AddQuotePostFormView
					onClose={onCloseModal}
					user={user}
					post={post}
				/>
			) : null}
		</>
	)
}

export default AddQuotePostModalContainer
