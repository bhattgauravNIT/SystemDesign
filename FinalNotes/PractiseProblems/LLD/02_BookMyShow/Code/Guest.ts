import { User } from "./User";

export class Guest extends User {
    private isRegistered: boolean;
    constructor(userName: string) {
        super(userName);
        this.isRegistered = false;
    }

    public register(user: Guest) {
        // check if user already exists
        this.isRegistered = true;
    }
}