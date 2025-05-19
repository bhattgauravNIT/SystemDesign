import { Booking } from "../Booking";
import { Flight } from "../Flight";
import { FlightBookingApp } from "../FlightBookingApp";
import { Login } from "../LoginModule/Interface/Login";
import { FlightProvider } from "./FlightProvider";
import { RegFlightProviderAction } from "./Interface/RegFlightProviderAction";

export class RegisteredFlightProvider extends FlightProvider implements Login, RegFlightProviderAction {

    private name: string;
    private isLoggedIn: boolean = false;
    private static bookingApp: FlightBookingApp = new FlightBookingApp();

    constructor(name: string) {
        super(name);
        this.name = name;
        
    }

    public get $name(): string {
        return this.name;
    }

    public get $isLoggedIn(): boolean {
        return this.isLoggedIn;
    }

    login(credentials: any, logInStrategy: Login) {
        logInStrategy.login(credentials, logInStrategy);
        this.isLoggedIn = true;
        // check in database if credentials are validated
    }

    addFlight(flight: Flight): void {
        RegisteredFlightProvider.bookingApp.addFlight(flight);

    }

    updateFlight(oldFlight: Flight, newFlight: Flight): void {
        RegisteredFlightProvider.bookingApp.updateFlight(oldFlight, newFlight);
    }

    viewAllBookings(flight: Flight): Booking[] {
        return flight.getAllBookingDetails();
    }

    cancelAllBookings(flight: Flight): void {
        flight.cancelAllBookings();
    }

}