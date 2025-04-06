import { Movie } from "./Movie";
import { Theater } from "./Theater";

export class Show {
    private _id: number;
    private _showTime: Date;
    private _movie: Movie;
    private _availableSeats: number;
    private _theater: Theater;

    constructor(
        id: number,
        showTime: Date,
        movie: Movie,
        theater: Theater,
    ) {
        this._id = id
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
}