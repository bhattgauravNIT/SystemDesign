import { Booking } from "./Booking";
import { generateId } from "./Constants/Helper";
import { FlightProvider } from "./FlightProviderModule/FlightProvider";
import { User } from "./UserModule/User";

export class Flight {
    id: string;
    source: string;
    destination: string;
    schedule: Date;
    availableSeats: number;
    flightProvider: FlightProvider;
    price: number;
    bookings: Booking[];

    constructor(source: string, destination: string, schedule: Date, availableSeats: number, flightProvider: FlightProvider, price: number) {
        this.source = source;
        this.destination = destination;
        this.schedule = schedule;
        this.availableSeats = availableSeats;
        this.flightProvider = flightProvider;
        this.id = generateId(6);
        this.price = price;
        this.bookings = [];
    }

    bookFlight(user: User, seatsRequested: number): Booking | null {
        if (this.availableSeats >= seatsRequested) {
            let booking = new Booking(this, user, this.price, seatsRequested);
            this.availableSeats -= seatsRequested;
            console.log(`Booking successful`);
            this.bookings.push(booking);
            return booking;
        } else {
            console.log('Requested seats are not available');
            return null;
        }
    }

    cancelFlight(user: User, pnr: string) {
        this.bookings.forEach((val) => {
            if (val.pnr === pnr && val.user === user) {
                val.isCancelled = true;
                this.availableSeats += val.numberOfSeats;
                console.log(`Booking cancelled successfully`);
                return;
            }
        })
    }

    getBookingDetails(user: User, pnr: string) {
        return this.bookings.find((val) => val.pnr === pnr && val.user === user);
    }

    getAllBookingDetails() {
        return this.bookings;
    }

    cancelAllBookings() {
        this.bookings = [];
    }
}