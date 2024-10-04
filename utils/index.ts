import { openDB, type IDBPDatabase } from "idb";
import type { WinWebSchema } from "./types";

export let idb: Promise<IDBPDatabase<WinWebSchema>>;

if (import.meta.client) {
	idb = openDB<WinWebSchema>("winweb", 1, {
		upgrade(database, oldVersion, newVersion, transaction, event) {
			// User related
			const users = database.createObjectStore("users", {
				keyPath: "uid",
			});
			users.createIndex("userName", "userName", { unique: true });
			users.createIndex("uid", "uid", { unique: true });

			// File related
			const files = database.createObjectStore("files", {
				keyPath: "uid",
			});
		},
	});
}

export function delay(number: number) {
	return new Promise<void>((resolve) => {
		setTimeout(resolve, number);
	});
}
