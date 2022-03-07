import { Post } from "@/modules/posts/dtos/post.dto"

export const postsInfrastructureFakes: Post[] = [
	{
		id: "8cf82534-c69e-4838-92b5-14b75d44d5d8",
		content: "Content 1",
		user_id: "f6cd4999-8548-4e3d-9df0-5e8de679b131",
		quote: "",
		type: "post",
		created_at: new Date(),
		user: {
			id: "f6cd4999-8548-4e3d-9df0-5e8de679b131",
			username: "John",
			created_at: new Date(),
		},
	},
	{
		id: "45af1cd9-b461-40ff-b31b-4bf042c103dc",
		content: "Walk the dog",
		user_id: "96cd9474-cea8-44bd-93b6-da220d6684a9",
		quote: "",
		type: "post",
		created_at: new Date(),
		user: {
			id: "96cd9474-cea8-44bd-93b6-da220d6684a9",
			username: "John Luke",
			created_at: new Date(),
		},
	},
	{
		id: "698b9702-8b08-458a-a6a2-0566cba2ac37",
		content: "Start the project",
		user_id: "05baa1ba-770d-4e1f-a4ce-b1b2aa3e7d38",
		quote: "",
		type: "post",
		created_at: new Date(),
		user: {
			id: "05baa1ba-770d-4e1f-a4ce-b1b2aa3e7d38",
			username: "Luke",
			created_at: new Date(),
		},
	},
]
