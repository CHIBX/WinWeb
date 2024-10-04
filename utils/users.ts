import { uid } from "uid";
import { idb } from ".";
import type { NewUser, User } from "./types";

export async function getUsers() {
	const tx = (await idb).transaction("users", "readonly");
	const store = tx.objectStore("users");
	const users = await store.getAll();
	return users;
}

export async function addUser(newUser: NewUser) {
	const tx = (await idb).transaction("users", "readwrite");
	const store = tx.objectStore("users");
	const user = { ...newUser, uid: uid(), isCurrent: false };
	store.put(user);
	await tx.done;
}

export async function deleteUsers() {
	const tx = (await idb).transaction("users", "readwrite");
	const store = tx.objectStore("users");
	store.clear();
	await tx.done;
}
export async function refreshUser() {
	const userStore = useUser();
	const defaultUser: User = {
		avatar: null,
		fullName: "John Doe",
		isCurrent: true,
		password: "password",
		uid: uid(),
		userName: "default",
	};
	await deleteUsers();
	const tx = (await idb).transaction("users", "readwrite");
	const store = tx.objectStore("users");
	store.put(defaultUser);
	await tx.done;
	userStore.$patch({
		currentUser: defaultUser,
	});
}
