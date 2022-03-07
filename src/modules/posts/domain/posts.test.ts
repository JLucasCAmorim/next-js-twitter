import { Post } from "@/modules/posts/dtos/post.dto"
import { addPost, getPosts } from "@/modules/posts/domain/posts.actions"
import { PostsInMemory } from "@/modules/posts/infra/posts.in-memory"
import { postsInfrastructureFakes } from "@/modules/posts/infra/posts.fakes"
import { v4 as uuidv4 } from "uuid"

describe("[posts] unit tests", () => {
	const postsOutput = new PostsInMemory()

	beforeEach(() => {
		postsOutput.setPosts([])
	})

	describe("when the user wants to get his posts", () => {
		it("should get them without error", async () => {
			postsOutput.setPosts(postsInfrastructureFakes)

			const posts: Post[] = await getPosts({
				postsOutput,
			})

			const expectedPosts: Post[] = postsInfrastructureFakes.map(
				(infraModel: Post) => ({
					id: infraModel.id,
					content: infraModel.content,
					type: infraModel.type,
					quote: infraModel.quote,
					user_id: infraModel.user_id,
					created_at: infraModel.created_at,
					user: infraModel.user,
				})
			)

			expect(posts).toEqual(expectedPosts)
		})

		it("shouldn't get them and should throw error", async () => {
			postsOutput.setPosts(undefined)

			await expect(
				getPosts({
					postsOutput,
				})
			).rejects.toThrowError()
		})
	})

	describe("when the user wants to add a post", () => {
		it("should add it to his empty posts", async () => {
			const created_at = new Date()
			const user_id = uuidv4()
			const id = uuidv4()
			const posts: Post[] = await addPost({
				postsOutput,
				id,
				content: "I want to add this content to test",
				type: "post",
				user_id,
				created_at,
				user: {
					id: user_id,
					username: "John Luke",
					created_at,
				},
			})

			const expectedPosts: Post[] = [
				{
					id,
					content: "I want to add this content to test",
					type: "post",
					quote: "",
					user_id,
					created_at,
					user: {
						id: user_id,
						username: "John Luke",
						created_at,
					},
				},
			]

			expect(posts).toEqual(expectedPosts)
		})

		it("should add it to his existing posts", async () => {
			postsOutput.setPosts(postsInfrastructureFakes)
			const created_at = new Date()
			const user_id = uuidv4()
			const id = uuidv4()

			const posts: Post[] = await addPost({
				postsOutput,
				id,
				content: "I want to add this content to test",
				type: "post",
				user_id,
				created_at,
				user: {
					id: user_id,
					username: "John Luke",
					created_at,
				},
			})

			const expectedPosts: Post[] = [
				...postsOutput.mapToDomainModel(postsInfrastructureFakes),
				{
					id,
					content: "I want to add this content to test",
					type: "post",
					quote: "",
					user_id,
					created_at,
					user: {
						id: user_id,
						username: "John Luke",
						created_at,
					},
				},
			]

			expect(posts).toEqual(expectedPosts)
		})

		it("shouldn't add it and should throw error", async () => {
			postsOutput.setPosts(undefined)
			const user_id = uuidv4()
			const id = uuidv4()

			await expect(
				addPost({
					postsOutput,
					id,
					content: "I want to add this content to test",
					type: "post",
					user_id,
					created_at: new Date(),
					user: {
						id: user_id,
						username: "John Luke",
						created_at: new Date(),
					},
				})
			).rejects.toThrowError()
		})
	})
	describe("when the user wants to add more than 5 posts in the same day", () => {
		it("shouldn't add it and should throw error", async () => {
			const created_at = new Date()
			const user_id = uuidv4()

			await addPost({
				postsOutput,
				id: uuidv4(),
				content: "I want to add this content to test",
				type: "post",
				user_id,
				created_at,
				user: {
					id: user_id,
					username: "John Luke",
					created_at,
				},
			})
			await addPost({
				postsOutput,
				id: uuidv4(),
				content: "I want to add this content to test",
				type: "post",
				user_id,
				created_at,
				user: {
					id: user_id,
					username: "John Luke",
					created_at,
				},
			})
			await addPost({
				postsOutput,
				id: uuidv4(),
				content: "I want to add this content to test",
				type: "post",
				user_id,
				created_at,
				user: {
					id: user_id,
					username: "John Luke",
					created_at,
				},
			})
			await addPost({
				postsOutput,
				id: uuidv4(),
				content: "I want to add this content to test",
				type: "post",
				user_id,
				created_at,
				user: {
					id: user_id,
					username: "John Luke",
					created_at,
				},
			})
			await addPost({
				postsOutput,
				id: uuidv4(),
				content: "I want to add this content to test",
				type: "post",
				user_id,
				created_at,
				user: {
					id: user_id,
					username: "John Luke",
					created_at,
				},
			})
			await expect(
				addPost({
					postsOutput,
					id: uuidv4(),
					content: "I want to add this content to test",
					type: "post",
					user_id,
					created_at: new Date(),
					user: {
						id: user_id,
						username: "John Luke",
						created_at,
					},
				})
			).rejects.toThrowError()
		})
	})
})
