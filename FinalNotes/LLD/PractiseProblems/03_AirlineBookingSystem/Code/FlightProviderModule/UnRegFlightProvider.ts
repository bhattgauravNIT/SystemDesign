import { FlightBookingApp } from "../FlightBookingApp";
import { FlightProvider } from "./FlightProvider";

export class UnRegisteredFlightProvider extends FlightProvider {
    private name: string;
    private isRegistered: boolean = false;
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

    /**
     * Getter $isRegistered
     * @return {boolean }
     */
    public get $isRegistered(): boolean {
        return this.isRegistered;
    }

    register(credentials: { userName: string, password: string }) {
        // do some magic
        this.isRegistered = true;
        // store flight provider in Database
        UnRegisteredFlightProvider.bookingApp.registerFlightProvider(this);
    }
}