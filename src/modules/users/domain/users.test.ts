import { User } from "@/modules/users/dtos/user.dto"
import {
	addUser,
	getUsers,
	followUser,
	unfollowUser,
} from "@/modules/users/domain/users.actions"
import { UsersInMemory } from "@/modules/users/infra/users.in-memory"
import { usersInfrastructureFakes } from "@/modules/users/infra/users.fakes"
import { v4 as uuidv4 } from "uuid"

describe("[users] unit tests", () => {
	const usersOutput = new UsersInMemory()

	beforeEach(() => {
		usersOutput.setUsers([])
	})

	describe("when the user wants to get the list of users", () => {
		it("should get them without error", async () => {
			usersOutput.setUsers(usersInfrastructureFakes)

			const users: User[] = await getUsers({
				usersOutput,
			})

			const expectedUsers: User[] = usersInfrastructureFakes.map(
				(infraModel: User) => ({
					id: infraModel.id,
					username: infraModel.username,
					followers: infraModel.followers,
					following: infraModel.following,
					created_at: infraModel.created_at,
				})
			)

			expect(users).toEqual(expectedUsers)
		})

		it("shouldn't get them and should throw error", async () => {
			usersOutput.setUsers(undefined)

			await expect(
				getUsers({
					usersOutput,
				})
			).rejects.toThrowError()
		})
	})

	describe("when the user wants to add a user", () => {
		it("should add it to his empty users", async () => {
			const id = uuidv4()
			const created_at = new Date()
			const users: User[] = await addUser({
				usersOutput,
				id,
				username: "John Luke",
				created_at,
			})

			const expectedUsers: User[] = [
				{
					id,
					username: "John Luke",
					followers: [],
					following: [],
					created_at,
				},
			]

			expect(users).toEqual(expectedUsers)
		})

		it("should add it to his existing users", async () => {
			usersOutput.setUsers(usersInfrastructureFakes)

			const id = uuidv4()
			const created_at = new Date()

			const users: User[] = await addUser({
				usersOutput,
				id,
				username: "John Luke",
				created_at,
			})

			const expectedUsers: User[] = [
				...usersOutput.mapToDomainModel(usersInfrastructureFakes),
				{
					id,
					username: "John Luke",
					followers: [],
					following: [],
					created_at,
				},
			]

			expect(users).toEqual(expectedUsers)
		})

		it("shouldn't add it and should throw error", async () => {
			usersOutput.setUsers(undefined)
			const id = uuidv4()

			await expect(
				addUser({
					usersOutput,
					id,
					username: "John Luke",
					created_at: new Date(),
				})
			).rejects.toThrowError()
		})
	})
	describe("when the user wants to follow a user", () => {
		it("should follow them without error", async () => {
			const id = uuidv4()
			const id2 = uuidv4()
			const created_at = new Date()
			// User 1
			await addUser({
				usersOutput,
				id,
				username: "John Luke",
				created_at,
			})
			// User 2 and Current User
			await addUser({
				usersOutput,
				id: id2,
				username: "John",
				created_at,
			})

			await followUser({ usersOutput, user_id: id })

			const users: User[] = await getUsers({
				usersOutput,
			})

			const expectedUsers: User[] = [
				{
					id,
					username: "John Luke",
					followers: [id2],
					following: [],
					created_at,
				},
				{
					id: id2,
					username: "John",
					followers: [],
					following: [id],
					created_at,
				},
			]

			expect(users).toEqual(expectedUsers)
		})
		it("shouldn't follow a non-existent user", async () => {
			const id = uuidv4()
			const id2 = uuidv4()
			const created_at = new Date()
			// User 1
			await addUser({
				usersOutput,
				id,
				username: "John Luke",
				created_at,
			})

			await expect(
				followUser({ usersOutput, user_id: id2 })
			).rejects.toThrowError()
		})
		it("shouldn't follow himself and should throw error", async () => {
			const id = uuidv4()
			const created_at = new Date()
			// User 1
			await addUser({
				usersOutput,
				id,
				username: "John Luke",
				created_at,
			})
			await expect(
				followUser({ usersOutput, user_id: id })
			).rejects.toThrowError()
		})
		it("shouldn't follow and should throw error", async () => {
			usersOutput.setUsers(undefined)
			const id = uuidv4()

			await expect(
				followUser({ usersOutput, user_id: id })
			).rejects.toThrowError()
		})
	})
	describe("when the user wants to unfollow a user", () => {
		it("should unfollow them without error", async () => {
			const id = uuidv4()
			const id2 = uuidv4()
			const created_at = new Date()
			// User 1
			await addUser({
				usersOutput,
				id,
				username: "John Luke",
				created_at,
			})
			// User 2 and Current User
			await addUser({
				usersOutput,
				id: id2,
				username: "John",
				created_at,
			})

			await followUser({ usersOutput, user_id: id })

			await unfollowUser({ usersOutput, user_id: id })

			const users: User[] = await getUsers({
				usersOutput,
			})

			const expectedUsers: User[] = [
				{
					id,
					username: "John Luke",
					followers: [],
					following: [],
					created_at,
				},
				{
					id: id2,
					username: "John",
					followers: [],
					following: [],
					created_at,
				},
			]

			expect(users).toEqual(expectedUsers)
		})
		it("shouldn't unfollow a non-existent user", async () => {
			const id = uuidv4()
			const id2 = uuidv4()
			const created_at = new Date()
			// User 1
			await addUser({
				usersOutput,
				id,
				username: "John Luke",
				created_at,
			})

			await expect(
				unfollowUser({ usersOutput, user_id: id2 })
			).rejects.toThrowError()
		})
		it("shouldn't unfollow and should throw error", async () => {
			usersOutput.setUsers(undefined)
			const id = uuidv4()

			await expect(
				unfollowUser({ usersOutput, user_id: id })
			).rejects.toThrowError()
		})
	})
})
