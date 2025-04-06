import { User } from "./User";

class Guest extends User {
    constructor(id: number, userName: string, mobileNumber: number) {
        super(id, userName, mobileNumber);
    }
}