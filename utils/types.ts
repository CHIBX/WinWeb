import type { DBSchema } from "idb";

export type User = {
	uid: string;
	fullName: string;
	userName: string;
	password: string;
	avatar: ArrayBuffer | null;
	isCurrent: boolean;
};

export type NewUser = Omit<User, "uid" | "isCurrent">;

export interface WinWebSchema extends DBSchema {
	users: {
		key: number;
		value: User;
		indexes: {
			userName: string;
			uid: string;
		};
	};
	files: {
		key: string;
		user: string;
		value: {
			uid: string;
			name: string;
			size: number;
			path: string;
			isDir: boolean;
		};
	};
}
