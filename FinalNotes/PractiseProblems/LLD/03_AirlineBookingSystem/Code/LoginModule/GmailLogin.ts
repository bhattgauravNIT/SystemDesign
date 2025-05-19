import { Login } from "./Interface/Login";

export class GmailLogin implements Login {
    login(credentials: { gmailUserName: string, gmailPassword: string }) {
        // check if the user is registered in the system
        console.log('Logged in via gmail');
    }

}
