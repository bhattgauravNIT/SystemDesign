import { Flight } from "../../Flight";

export interface CommonActions {
    searchFlight(source: string, destination: string, schedule: Date): Flight[] | undefined;
}