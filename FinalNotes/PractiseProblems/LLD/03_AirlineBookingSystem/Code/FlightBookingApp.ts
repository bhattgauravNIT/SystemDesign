import { Flight } from "./Flight";
import { FlightProvider } from "./FlightProviderModule/FlightProvider";
import { RegisteredFlightProvider } from "./FlightProviderModule/RegFlightProvider";
import { UnRegisteredFlightProvider } from "./FlightProviderModule/UnRegFlightProvider";
import { RegisteredUser } from "./UserModule/RegUser";
import { UnRegisteredUser } from "./UserModule/UnRegUser";
import { User } from "./UserModule/User";

export class FlightBookingApp {

    static user: User[] = [];
    static flightProvider: FlightProvider[] = [];
    static flights: Map<string, Flight[]> = new Map();

    constructor() { }

    registerUser(user: UnRegisteredUser) {
        FlightBookingApp.user.push(user);
    }

    registerFlightProvider(flightProvider: FlightProvider) {
        FlightBookingApp.flightProvider.push(flightProvider);
    }

    addFlight(flight: Flight) {
        const key = this.generateKey(flight);
        if (!FlightBookingApp.flights.has(key)) {
            FlightBookingApp.flights.set(key, [flight]);
        } else {
            let flights = FlightBookingApp.flights.get(key);
            if (flights) {
                flights?.push(flight);
                FlightBookingApp.flights.set(key, flights);
            }
        }
    }

    updateFlight(oldFlight: Flight, newFlight: Flight) {
        const key = this.generateKey(oldFlight);
        if (FlightBookingApp.flights.has(key)) {
            let flights = FlightBookingApp.flights.get(key);
            if (flights) {
                flights = flights.filter((val) => val !== oldFlight);
                FlightBookingApp.flights.set(key, flights);
            }
        }
        this.addFlight(newFlight);
    }

    searchFlights(source: string, destination: string, schedule: Date) {
        const key = `${schedule.getFullYear()}_${schedule.getMonth()}_${schedule.getDate()}`;
        if (FlightBookingApp.flights.has(key)) {
            let flights = FlightBookingApp.flights.get(key);
            let matchingFlights = flights?.filter((val) => val.source === source && val.destination === destination);
            return matchingFlights;
        }
        return undefined;
    }

    private generateKey(flight: Flight) {
        return `${flight.schedule.getFullYear()}_${flight.schedule.getMonth()}_${flight.schedule.getDate()}`
    }
}