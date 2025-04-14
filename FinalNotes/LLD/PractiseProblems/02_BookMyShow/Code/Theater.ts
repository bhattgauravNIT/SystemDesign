import { Show } from "./Show";

export class Theater {
    private static theater_id = 0;
    private id: number;
    private _name: string;
    private _location: string;
    private _capacity: number;
    private _shows: Show[];

    constructor(name: string, location: string, capacity: number) {
        this.id = Theater.theater_id++;
        this._name = name;
        this._location = location;
        this._capacity = capacity;
        this._shows = [];
    }

    /**
     * Getter $id
     * @return {number}
     */
    public get $id(): number {
        return this.id;
    }

    /**
     * Getter name
     * @return {string}
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Getter location
     * @return {string}
     */
    public get location(): string {
        return this._location;
    }

    /**
     * Getter capacity
     * @return {number}
     */
    public get capacity(): number {
        return this._capacity;
    }

    /**
     * Getter shows
     * @return {Show[]}
     */
    public get shows(): Show[] {
        return this._shows;
    }

    /**
     * Setter $id
     * @param {number} value
     */
    public set $id(value: number) {
        this.id = value;
    }

    /**
     * Setter name
     * @param {string} value
     */
    public set name(value: string) {
        this._name = value;
    }

    /**
     * Setter location
     * @param {string} value
     */
    public set location(value: string) {
        this._location = value;
    }

    /**
     * Setter capacity
     * @param {number} value
     */
    public set capacity(value: number) {
        this._capacity = value;
    }

    /**
     * Setter shows
     * @param {Show[]} value
     */
    public set shows(value: Show[]) {
        this._shows = value;
    }

    public updateShow(oldShow: Show, newShow: Show) {
        this.shows = this.shows.filter((val) => val === oldShow);
        this.shows.push(newShow);
    }

}