export abstract class User {

    private static user_id: number = 0;
    private id: number;
    private _userName: string;

    constructor(userName: string) {
        this.userName = userName;
        this.id = User.user_id++;

    }

    public get userName(): string {
        return this._userName;
    }
    public set userName(value: string) {
        this._userName = value;
    }
}
