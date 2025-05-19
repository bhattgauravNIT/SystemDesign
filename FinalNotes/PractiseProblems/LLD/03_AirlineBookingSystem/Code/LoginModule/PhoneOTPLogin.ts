import { Login } from "./Interface/Login";

export class PhoneOtpLogin implements Login {
    login(credentials: { phoneNumber: number, OTP: number }) {
        // do some magic
        console.log("Logged in via OTP");
    }

}