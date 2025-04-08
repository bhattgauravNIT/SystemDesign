import { Movie } from "./Movie";
import { RegisteredUser } from "./RegisteredUser";
import { Theater } from "./Theater";
import { Ticket } from "./Ticket";
import { User } from "./User";

export class Show {
    private static show_id: number = 0;
    private _id: number;
    private _showTime: Date;
    private _movie: Movie;
    private _availableSeats: number;
    private _theater: Theater;

    constructor(
        showTime: Date,
        movie: Movie,
        theater: Theater,
    ) {
        this._id = Show.show_id++;
        this._showTime = showTime
        this._movie = movie
        this._theater = theater
        this._availableSeats = theater.capacity;
    }

    /**
     * Getter id
     * @return {number}
     */
    public get id(): number {
        return this._id;
    }

    /**
     * Getter showTime
     * @return {Date}
     */
    public get showTime(): Date {
        return this._showTime;
    }

    /**
     * Getter theater
     * @return {Theater}
     */
    public get theater(): Theater {
        return this._theater;
    }

    /**
     * Getter availableSeats
     * @return {number}
     */
    public get availableSeats(): number {
        return this._availableSeats;
    }

    /**
     * Setter id
     * @param {number} value
     */
    public set id(value: number) {
        this._id = value;
    }

    /**
     * Setter showTime
     * @param {Date} value
     */
    public set showTime(value: Date) {
        this._showTime = value;
    }

    /**
     * Setter theater
     * @param {Theater} value
     */
    public set theater(value: Theater) {
        this._theater = value;
    }

    /**
     * Setter availableSeats
     * @param {number} value
     */
    public set availableSeats(value: number) {
        this._availableSeats = value;
    }

    /**
     * Getter movie
     * @return {Movie}
     */
    public get movie(): Movie {
        return this._movie;
    }

    /**
     * Setter movie
     * @param {Movie} value
     */
    public set movie(value: Movie) {
        this._movie = value;
    }

    public bookTickets(numberOfSeats: number, user: User, theater: Theater, bookedShow: Show): Ticket | null {
        if (!(user instanceof RegisteredUser)) {
            console.log("please register for before proceeding to book tickets")
            return null;
        } else if (this._availableSeats < numberOfSeats) {
            console.log(`${numberOfSeats} not available for the ${bookedShow}`)
            return null;
        } else {
            let ticket = new Ticket(numberOfSeats, user.userName, bookedShow, new Date(), theater);
            this._availableSeats -= numberOfSeats;
            console.log("ticket booked successfully");
            return ticket;
        }

    }
}