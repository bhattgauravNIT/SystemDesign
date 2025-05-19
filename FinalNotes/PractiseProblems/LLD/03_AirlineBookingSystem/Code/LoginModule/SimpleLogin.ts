import { Login } from "./Interface/Login";

export class SimpleLogin implements Login {

    login(credentials: { username: string, password: string }) {
        // don some magic
        console.log("Logged in via simple login strategy")
    }
}