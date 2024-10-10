import { uid } from "uid";
import type { IDBTransactionWithWrite, NewUser, User } from "@/utils/types";

export async function getUsers() {
	const tx = await transaction("users", "readonly");
	const store = tx.objectStore("users");
	const users = await store.getAll();
	return users;
}

export async function addUser(tx: IDBTransactionWithWrite, newUser: NewUser) {
	const store = tx.objectStore("users");
	const user = { ...newUser, uid: uid(), isCurrent: false };
	return store.put(user);
}

export async function deleteUsers(tx: IDBTransactionWithWrite) {
	const store = tx.objectStore("users");
	return store.clear();
}
export async function refreshUser() {
	const userStore = useUser();
	const tx = await transaction(void 0, "readwrite");
	const defaultUser: User = {
		avatar: null,
		fullName: "John Doe",
		isCurrent: true,
		password: "1234",
		uid: uid(),
		userName: "User",
	};
	deleteUsers(tx);
	const store = tx.objectStore("users");
	store.put(defaultUser);
	await tx.done;
	userStore.$patch({
		currentUser: defaultUser,
	});
}
