import { Flight } from "./Flight";
import { FlightBookingApp } from "./FlightBookingApp";
import { RegisteredFlightProvider } from "./FlightProviderModule/RegFlightProvider";
import { UnRegisteredFlightProvider } from "./FlightProviderModule/UnRegFlightProvider";
import { GmailLogin } from "./LoginModule/GmailLogin";
import { Login } from "./LoginModule/Interface/Login";
import { PhoneOtpLogin } from "./LoginModule/PhoneOTPLogin";
import { SimpleLogin } from "./LoginModule/SimpleLogin";
import { RegisteredUser } from "./UserModule/RegUser";
import { UnRegisteredUser } from "./UserModule/UnRegUser";


/**checking register process for a new flight provider*/


// let AI = new UnRegisteredFlightProvider("AirIndia");
// AI.register({ userName: "AirInida", password: "airIndia@gov.in" });

// let Indigo = new UnRegisteredFlightProvider("Indigo");
// Indigo.register({ userName: "Indigo", password: "indigo@gov.in" });

// let AirIndiaExpress = new UnRegisteredFlightProvider("AirIndiaExpress");
// AirIndiaExpress.register({ userName: "Tata", password: "aiExpress@gov.in" });

// let Vistara = new UnRegisteredFlightProvider("Vistara");
// Vistara.register({ userName: "Vistara", password: "vistara@gov.in" });

// console.log(FlightBookingApp.flightProvider);



/**checking login process for a registered flight provider */

let AI = new RegisteredFlightProvider("AirIndia");
let Indigo = new RegisteredFlightProvider("Indigo");
let AirIndiaExpress = new RegisteredFlightProvider("AirIndiaExpress");
let Vistara = new RegisteredFlightProvider("Vistara");

// let gmailLogIn: Login = new GmailLogin();
// let otpLogin: Login = new PhoneOtpLogin();
// let simpleLogin: Login = new SimpleLogin();

// AI.login({ userName: "AirInida", password: "airIndia@gov.in" }, gmailLogIn);
// Indigo.login({ userName: "AirInida", password: "airIndia@gov.in" }, otpLogin);
// AirIndiaExpress.login({ userName: "AirInida", password: "airIndia@gov.in" }, simpleLogin);
// Vistara.login({ userName: "AirInida", password: "airIndia@gov.in" }, gmailLogIn);


/** Checking function of a adding and updating a flight for registered flight provider */

let f1 = new Flight("Delhi", "Bangalore", new Date(2025, 4, 12), 500, AI, 7000);
let f2 = new Flight("Delhi", "Chennai", new Date(2025, 4, 12), 500, AI, 7000);
let f3 = new Flight("Delhi", "Goa", new Date(2025, 4, 12), 500, AI, 7000);
let f4 = new Flight("Delhi", "Nepal", new Date(2025, 4, 12), 500, AI, 17000);
let f5 = new Flight("Delhi", "UK", new Date(2025, 4, 12), 500, AI, 70000);
let f6 = new Flight("Delhi", "Germany", new Date(2025, 4, 12), 500, AI, 80000);
let f7 = new Flight("Delhi", "Germany", new Date(2025, 5, 12), 500, AI, 90000);
let f8 = new Flight("Delhi", "Germany", new Date(2025, 6, 12), 500, AI, 70000);

AI.addFlight(f1)
AI.addFlight(f2)
AI.addFlight(f3)
AI.addFlight(f4)
AI.addFlight(f5)
AI.addFlight(f6)
AI.addFlight(f7)
AI.addFlight(f8)

let f11 = new Flight("Delhi", "Bangalore", new Date(2025, 4, 12), 500, Indigo, 7000);
let f21 = new Flight("Delhi", "Chennai", new Date(2025, 4, 12), 500, Indigo, 7000);
let f31 = new Flight("Delhi", "Goa", new Date(2025, 4, 12), 500, Indigo, 7000);
let f41 = new Flight("Delhi", "Nepal", new Date(2025, 4, 12), 500, Indigo, 17000);
let f51 = new Flight("Delhi", "UK", new Date(2025, 4, 12), 500, Indigo, 70000);
let f61 = new Flight("Delhi", "Germany", new Date(2025, 4, 12), 500, Indigo, 80000);
let f71 = new Flight("Delhi", "Germany", new Date(2025, 5, 12), 500, Indigo, 90000);
let f81 = new Flight("Delhi", "Germany", new Date(2025, 6, 12), 500, Indigo, 70000);

Indigo.addFlight(f11)
Indigo.addFlight(f21)
Indigo.addFlight(f31)
Indigo.addFlight(f41)
Indigo.addFlight(f51)
Indigo.addFlight(f61)
Indigo.addFlight(f71)
Indigo.addFlight(f81)

let f12 = new Flight("Delhi", "Bangalore", new Date(2025, 4, 12), 500, AirIndiaExpress, 7000);
let f22 = new Flight("Delhi", "Chennai", new Date(2025, 4, 12), 500, AirIndiaExpress, 7000);
let f32 = new Flight("Delhi", "Goa", new Date(2025, 4, 12), 500, AirIndiaExpress, 7000);

AirIndiaExpress.addFlight(f12)
AirIndiaExpress.addFlight(f22)
AirIndiaExpress.addFlight(f32)

let f112 = new Flight("Delhi", "Gujarat", new Date(2025, 4, 12), 500, Vistara, 7000);
let f1121 = new Flight("Delhi", "Gujarat", new Date(2025, 8, 12), 600, Vistara, 6000);
Vistara.addFlight(f112);

Vistara.updateFlight(f112, f1121);


/**User should be able to search */
// console.log(FlightBookingApp.flights);

let gaurav = new RegisteredUser("gaurav");
// console.log(gaurav.searchFlight("Delhi", "Bangalore", new Date(2025, 4, 12)));

let bhatt = new UnRegisteredUser("bhatt");
// console.log(bhatt.searchFlight("Delhi", "Gujarat", new Date(2025, 8, 12)));


/**Registered User should be able to book flights */

gaurav.bookTickets(f12, 12);
// gaurav.bookTickets(f12, 20);
// gaurav.bookTickets(f12, 30);

console.log(AirIndiaExpress.viewAllBookings(f12));

// gaurav.cancelTicket(f12, 'ccRN');
// console.log(f12.bookings);
// gaurav.cancelTicket(f12, 'ai28');
console.log(AirIndiaExpress.viewAllBookings(f12));

















