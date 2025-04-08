import { Ticket } from "./Ticket";
import { User } from "./User";

export class RegisteredUser extends User {
    private bookingHistory: Ticket[];
    private isLoggedIn: boolean;

    constructor(userName: string) {
        super(userName);
        this.bookingHistory = [];
        this.isLoggedIn = false;
    }

    login(userName: string, pass: string) {
        // do some checks on backend for validation
        this.isLoggedIn = true;
    }
}