import { Show } from "./Show";

export class Ticket {
    private _id: number;
    private numberOfSeats: number;
    private bookingName: string;
    private bookedShow: Show;
    private _bookingTime: Date;

    constructor(id: number, $numberOfSeats: number, $bookingName: string, $bookedShow: Show) {
		this._id = id;
		this.numberOfSeats = $numberOfSeats;
		this.bookingName = $bookingName;
		this.bookedShow = $bookedShow;
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
	public get $bookedShow(): Show {
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
}