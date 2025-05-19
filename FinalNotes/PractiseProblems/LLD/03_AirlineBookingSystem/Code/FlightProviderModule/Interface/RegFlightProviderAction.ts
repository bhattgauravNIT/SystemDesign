import { Flight } from "../../Flight";

export interface RegFlightProviderAction {
    addFlight(flight: Flight): void;
    updateFlight(oldFlight: Flight, newFlight: Flight): void;
    viewAllBookings(flight: Flight): void;
    cancelAllBookings(flight: Flight): void;
}