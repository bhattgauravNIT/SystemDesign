import { Ticket } from "./Ticket";
import { User } from "./User";

class RegisteredUser extends User {
    private bookingHistory: Ticket[];

    constructor(id: number, userName: string, mobileNumber: number) {
        super(id, userName, mobileNumber);
        this.bookingHistory = [];
    }
}