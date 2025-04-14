import { generateId } from "./Constants/Helper";
import { Flight } from "./Flight";
import { User } from "./UserModule/User";

export class Booking {
    pnr: string;
    flight: Flight;
    user: User;
    amount: number;
    isCancelled: boolean = false;
    numberOfSeats: number;

    constructor(flight: Flight, user: User, amount: number, numberOfSeats: number) {
        this.flight = flight;
        this.user = user;
        this.amount = amount;
        this.pnr = generateId(4);
        this.numberOfSeats = numberOfSeats;
    }

    getBookingDetails() {
        return {
            pnr: this.pnr,
            flight: this.flight,
            user: this.user,
            amount: this.amount,
            seats: this.numberOfSeats
        }
    }
}