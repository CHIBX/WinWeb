import {
	openDB,
	type IDBPDatabase,
	type IDBPTransaction,
	type StoreNames,
} from "idb";
import type { WinWebSchema } from "./types";

export let idb: Promise<IDBPDatabase<WinWebSchema>>;

//TODO: Watch this
const stores: ArrayLike<StoreNames<WinWebSchema>> = ["files", "users"];

if (import.meta.client) {
	idb = openDB<WinWebSchema>("winweb", 1, {
		upgrade(database) {
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
			files.createIndex("uid", "uid", { unique: true });
		},
	});
}

export function delay(number: number) {
	return new Promise<void>((resolve) => {
		setTimeout(resolve, number);
	});
}

export async function transaction<
	M extends "readonly" | "readwrite" = "readonly"
>(
	store?: StoreNames<WinWebSchema> | ArrayLike<StoreNames<WinWebSchema>>,
	mode?: M
): Promise<
	M extends "readonly"
		? IDBPTransaction<
				WinWebSchema,
				ArrayLike<StoreNames<WinWebSchema>>,
				"readonly"
		  >
		: IDBTransactionWithWrite
> {
	return (await idb).transaction<ArrayLike<StoreNames<WinWebSchema>>, M>(
		store ? (Array.isArray(store) ? store : [store]) : stores,
		mode
	) as M extends "readonly"
		? IDBPTransaction<WinWebSchema, ArrayLike<StoreNames<WinWebSchema>>, M>
		: IDBTransactionWithWrite;
}

function pad(str: string | number) {
	return ("" + str).padStart(2, "0");
}

const stringDays = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
export class Clock {
	_date = new Date();
	#isStarted = false;
	#watcher?: number | NodeJS.Timeout;
	#suscribers: Set<(date: Clock) => void> = new Set();

	get date() {
		return pad(this._date.getDate());
	}
	get month() {
		return pad(this._date.getMonth());
	}
	get monthFull() {
		return months[this._date.getMonth()];
	}
	get monthShort() {
		return months[this._date.getMonth()].slice(0, 3);
	}
	get day() {
		return pad(this._date.getDay());
	}
	get dayFull() {
		return stringDays[this._date.getDay()];
	}
	get dayShort() {
		return stringDays[this._date.getDay()].slice(0, 3);
	}
	get year() {
		return pad(this._date.getFullYear());
	}
	get hours() {
		return pad(this._date.getHours());
	}
	get minutes() {
		return pad(this._date.getMinutes());
	}
	get seconds() {
		return pad(this._date.getSeconds());
	}

	#start() {
		if (this.#isStarted) {
			return;
		}
		this.#watcher = setInterval(() => {
			this._date = new Date();
			this.#suscribers.forEach((callback) => callback(this));
			// console.log("Subscribers", Array.from(this.#suscribers));
		}, 1000);
		this.#isStarted = true;
	}

	suscribe(callback?: (date: Clock) => void) {
		if (!callback) {
			return;
		}
		// console.log("Suscribed");
		this.#suscribers.add(callback);
		if (!this.#isStarted) {
			this.#start();
		}
	}

	unsuscribe(callback: (date: Clock) => void) {
		this.#suscribers.delete(callback);

		if (this.#suscribers.size === 0) {
			this.#stop();
		}
	}
	#stop() {
		if (this.#watcher) {
			clearInterval(this.#watcher);
			this.#watcher = undefined;
		}
		this.#isStarted = false;
	}

	static getInstance() {
		if (_clock) {
			return _clock;
		}
		return (_clock = new Clock());
	}
}

let _clock: Clock;

export const clockRef = customRef((track, trigger) => {
	const _clock = Clock.getInstance();
	return {
		get() {
			track();
			return _clock;
		},
		set() {
			trigger();
		},
	};
});
