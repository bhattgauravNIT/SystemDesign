import { Flight } from "../Flight";
import { FlightBookingApp } from "../FlightBookingApp";
import { CommonActions } from "./Interface/CommonActions";
import { UnRegUserAction } from "./Interface/UnRegisteredUserAction";
import { User } from "./User";

export class UnRegisteredUser extends User implements UnRegUserAction, CommonActions {
    private name: string;
    private static bookingApp: FlightBookingApp = new FlightBookingApp();

    constructor(name: string) {
        super(name);
        this.name = name;
    }

    /**
     * Getter $name
     * @return {string}
     */
    public get $name(): string {
        return this.name;
    }

    register(credentials: { userName: string, password: string }) {
        // check if the user is already registered in the database or not
        // register the user in the system

        new FlightBookingApp().registerUser(this);
    }

    searchFlight(source: string, destination: string, schedule: Date): Flight[] | undefined {
        return UnRegisteredUser.bookingApp.searchFlights(source, destination, schedule);
    }

}