import { Genre } from "./Constants/Genre";
import { Languages } from "./Constants/Languages";

export class Movie {
    private _genre: Genre;
    private _languages: Languages;
    private _name: string;
    private _rating: Number;

    constructor(name: string, genre: Genre, language: Languages) {
        this._name = name;
        this._genre = genre;
        this._languages = language;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get rating(): Number {
        return this._rating;
    }

    public set rating(value: Number) {
        this._rating = value;
    }

    public get genre(): Genre {
        return this._genre;
    }

    public set genre(value: Genre) {
        this._genre = value;
    }

    public get languages(): Languages {
        return this._languages;
    }
    
    public set languages(value: Languages) {
        this._languages = value;
    }
}