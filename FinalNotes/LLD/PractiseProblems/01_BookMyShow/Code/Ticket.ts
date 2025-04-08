import { Show } from "./Show";
import { Theater } from "./Theater";

export class Ticket {
    private static user_id: number = 0;
    private _id: number;
    private numberOfSeats: number;
    private bookingName: string;
    private bookedShow: Show | null;
    private _bookingTime: Date;
    private theater: Theater;

    constructor($numberOfSeats: number, $bookingName: string, $bookedShow: Show, $bookingTime: Date, theater: Theater) {
        this._id = Ticket.user_id++;
        this.numberOfSeats = $numberOfSeats;
        this.bookingName = $bookingName;
        this.bookedShow = $bookedShow;
        this._bookingTime = $bookingTime;
        this.theater = theater;
    }


    /**
     * Getter id
     * @return {number}
     */
    public get id(): number {
        return this._id;
    }

    /**
     * Getter $numberOfSeats
     * @return {number}
     */
    public get $numberOfSeats(): number {
        return this.numberOfSeats;
    }

    /**
     * Getter $bookingName
     * @return {string}
     */
    public get $bookingName(): string {
        return this.bookingName;
    }

    /**
     * Getter $bookedShow
     * @return {Show}
     */
    public get $bookedShow(): Show | null {
        return this.bookedShow;
    }

    /**
     * Getter bookingTime
     * @return {Date}
     */
    public get bookingTime(): Date {
        return this._bookingTime;
    }

    /**
     * Setter id
     * @param {number} value
     */
    public set id(value: number) {
        this._id = value;
    }

    /**
     * Setter $numberOfSeats
     * @param {number} value
     */
    public set $numberOfSeats(value: number) {
        this.numberOfSeats = value;
    }

    /**
     * Setter $bookingName
     * @param {string} value
     */
    public set $bookingName(value: string) {
        this.bookingName = value;
    }

    /**
     * Setter $bookedShow
     * @param {Show} value
     */
    public set $bookedShow(value: Show) {
        this.bookedShow = value;
    }

    /**
     * Setter bookingTime
     * @param {Date} value
     */
    public set bookingTime(value: Date) {
        this._bookingTime = value;
    }

    public getBookingDetails() {
        console.log(`Booking for Mr/Ms ${this.$bookingName} for show: ${this.bookedShow?.movie.name} in theater ${this.theater.name}
        at time ${this.bookingTime}`)
    }

    public cancelTicket() {
        if (this.bookedShow && this.bookedShow.availableSeats) {
            this.bookedShow.availableSeats += this.numberOfSeats;
        }
        console.log("Ticket cancelled successfully")
    }
}