import { defineStore, acceptHMRUpdate } from "pinia";

export const useUser = defineStore("user", () => {
	const currentUser = ref<User | null>(null);
	const isLoggedIn = ref(false);

	async function deleteUser(id: string) {
		const tx = (await idb).transaction("users", "readwrite");
		const store = tx.objectStore("users");
		const totalUsers = await store.count();
		if (totalUsers <= 1) {
			try {
				tx.abort();
			} catch (error) {
				throw Error("Cannot delete only user");
			}
		}
		store.delete(IDBKeyRange.only(id));
		await tx.done;
		if (currentUser.value?.uid === id && currentUser.value.isCurrent) {
		}
	}

	async function changeUser(id: string) {
		if (!currentUser.value || currentUser.value.uid === id) {
			throw Error("Invalid action during user change");
		}
		const tx = (await idb).transaction("users", "readwrite");
		const store = tx.objectStore("users");
		const newUser = await store.get(IDBKeyRange.only(id));
		if (!newUser) return;
		newUser.isCurrent = true;
		store.put(newUser);
		const oldUser = currentUser.value;
		await tx.done;
	}

	return {
		currentUser,
		isLoggedIn,
		changeUser,
		deleteUser,
	};
});

// Hot Module Replacement
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot));
}
