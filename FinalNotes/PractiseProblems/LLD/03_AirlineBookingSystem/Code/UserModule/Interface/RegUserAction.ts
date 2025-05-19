import { Booking } from "../../Booking";
import { Flight } from "../../Flight";

export interface RegUserAction {
    bookTickets(flight: Flight, seats: number): void;
    cancelTicket(flight: Flight, pnr: string): void;
    getBookingDetailS(flight: Flight, pnr: string): void;
    getAllBookingHistory(): Booking[];
}