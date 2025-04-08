import { Genre } from "./Constants/Genre";
import { Languages } from "./Constants/Languages";
import { Guest } from "./Guest";
import { Movie } from "./Movie";
import { RegisteredUser } from "./RegisteredUser";
import { Show } from "./Show";
import { Theater } from "./Theater";
import { User } from "./User";

class BookMyShow {
    private theater: Theater[];
    movieMap: Map<string, Show[]>

    constructor(theater: Theater[]) {
        this.theater = theater;
        this.movieMap = new Map();
        this.generateMovieMap();
    }

    /**
     * Getter $theater
     * @return {Theater[]}
     */
    public get $theater(): Theater[] {
        return this.theater;
    }


    /**
     * Setter $theater
     * @param {Theater[]} value
     */
    public set $theater(value: Theater[]) {
        this.theater = value;
    }

    /**
     * 
     * 
     * Theater -> Shows[]
     * 
     * Show-> Movie
     * 
     * 
     * 
     * 
     * */

    public generateMovieMap() {
        for (const theater of this.theater) {
            for (const show of theater.shows) {
                if (!this.movieMap.has(show.movie.name)) {
                    let shows = [show];
                    this.movieMap.set(show.movie.name, shows);
                } else {
                    let currentShowList: Show[] | undefined = this.movieMap.get(show.movie.name);
                    currentShowList?.push(show)
                    if (currentShowList) {
                        this.movieMap.set(show.movie.name, currentShowList);
                    }
                }
            }
        }
    }

    public searchShows(movieName: string) {
        if (!this.movieMap.get(movieName)) {
            console.log(`No shows available for the ${movieName}`);
        } else {
            return this.movieMap.get(movieName);
        }
    }

    public bookTickets(show: Show, numberOfTickets: number, user: User, theater: Theater) {
        return show.bookTickets(numberOfTickets, user, theater, show);
    }
}


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


