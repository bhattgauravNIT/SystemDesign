import { Show } from "./Show";
import { Theater } from "./Theater";
import { User } from "./User";

export class BookMyShow {
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
