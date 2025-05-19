import { Booking } from "../Booking";
import { Flight } from "../Flight";
import { FlightBookingApp } from "../FlightBookingApp";
import { Login } from "../LoginModule/Interface/Login";
import { CommonActions } from "./Interface/CommonActions";
import { RegUserAction } from "./Interface/RegUserAction";
import { User } from "./User";

export class RegisteredUser extends User implements RegUserAction, CommonActions {

    private name: string;
    private isLoggedIn: boolean = false;
    private userBookings: Booking[];
    private static bookingApp: FlightBookingApp = new FlightBookingApp();

    constructor(name: string) {
        super(name);
        this.name = name;
        this.userBookings = [];
    }

    public get $name(): string {
        return this.name;
    }

    public get $isLoggedIn(): boolean {
        return this.isLoggedIn;
    }

    login(credentials: any, login: Login) {
        login.login(credentials, login);
        this.isLoggedIn = true;
    }

    searchFlight(source: string, destination: string, schedule: Date): Flight[] | undefined {
        return RegisteredUser.bookingApp.searchFlights(source, destination, schedule);
    }

    bookTickets(flight: Flight, seats: number): void {
        let booking = flight.bookFlight(this, seats);
        if (booking) {
            this.userBookings.push(booking);
        }
    }

    cancelTicket(flight: Flight, pnr: string): void {
        flight.cancelFlight(this, pnr);


    }
    getBookingDetailS(flight: Flight, pnr: string): void {
        flight.getBookingDetails(this, pnr);
    }

    getAllBookingHistory(): Booking[] {
        return this.userBookings;
    }
}