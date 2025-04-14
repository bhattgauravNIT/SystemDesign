import { BookMyShow } from "./BookMyShow";
import { Genre } from "./Constants/Genre";
import { Languages } from "./Constants/Languages";
import { Guest } from "./Guest";
import { Movie } from "./Movie";
import { RegisteredUser } from "./RegisteredUser";
import { Show } from "./Show";
import { Theater } from "./Theater";

//Users
let gaurav: RegisteredUser = new RegisteredUser("Gaurav");
let ayush: RegisteredUser = new RegisteredUser("Ayush");

//Theater
let pvr: Theater = new Theater("pvr", "Delhi", 600);
let IMAX = new Theater('IMAX', "Delhi", 500);

//Movies
let kgf: Movie = new Movie("Kgf", Genre.ACTION, Languages.HINDI);
let interstellar = new Movie("Interstellar", Genre.ACTION, Languages.ENGLISH);
let pushpa = new Movie("pushpa", Genre.ACTION, Languages.HINDI);


//Pvr shows
let kgfShow_PVR: Show = new Show(new Date("4/8/2025"), kgf, pvr)
let interstellarShow_PVR: Show = new Show(new Date("4/8/2025"), interstellar, pvr)
let pushpaShow_PVR: Show = new Show(new Date("4/8/2025"), pushpa, pvr)

//IMAX shows
let kgfShow_IMAX: Show = new Show(new Date("4/9/2025"), kgf, IMAX)
let interstellarShow_IMAX: Show = new Show(new Date("4/9/2025"), interstellar, IMAX)
let pushpaShow_IMAX: Show = new Show(new Date("4/9/2025"), pushpa, IMAX)

pvr.shows = [kgfShow_PVR, interstellarShow_PVR, pushpaShow_PVR];
IMAX.shows = [kgfShow_IMAX, interstellarShow_IMAX, pushpaShow_IMAX];

let bms = new BookMyShow([pvr, IMAX]);
console.log(bms.searchShows("pushpa"));

let kgf_pvrTicket = bms.bookTickets(kgfShow_PVR, 20, gaurav, pvr);
console.log(bms.searchShows("Kgf"));
kgf_pvrTicket?.getBookingDetails();
kgf_pvrTicket?.cancelTicket();
console.log(bms.searchShows("Kgf"));

let bob: Guest = new Guest("bob");
let interstellarShow_IMAX_tickets = bms.bookTickets(interstellarShow_IMAX, 100, bob, IMAX);
console.log(interstellarShow_IMAX_tickets);
bob.register(bob);

