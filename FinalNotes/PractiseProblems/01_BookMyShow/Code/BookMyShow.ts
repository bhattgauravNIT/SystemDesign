import { Theater } from "./Theater";
import { User } from "./User";

class BookMyShow {
    private users: User[];
    private theater: Theater[];

    constructor() {
        this.users = [];
        this.theater = [];
    }

    /**
     * Getter $users
     * @return {User[]}
     */
	public get $users(): User[] {
		return this.users;
	}

    /**
     * Getter $theater
     * @return {Theater[]}
     */
	public get $theater(): Theater[] {
		return this.theater;
	}

    /**
     * Setter $users
     * @param {User[]} value
     */
	public set $users(value: User[]) {
		this.users = value;
	}

    /**
     * Setter $theater
     * @param {Theater[]} value
     */
	public set $theater(value: Theater[]) {
		this.theater = value;
	}
}