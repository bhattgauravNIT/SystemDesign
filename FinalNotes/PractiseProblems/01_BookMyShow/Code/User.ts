export abstract class User {

    private id: number;
    private _userName: string;
    private _mobileNumber: number;

    constructor(id: number, userName: string, mobileNumber: number) {
        this.id = id;
        this.userName = userName;
        this.mobileNumber = mobileNumber;
    }

    public get userName(): string {
        return this._userName;
    }
    public set userName(value: string) {
        this._userName = value;
    }

    public get mobileNumber(): number {
        return this._mobileNumber;
    }
    public set mobileNumber(value: number) {
        this._mobileNumber = value;
    }
}