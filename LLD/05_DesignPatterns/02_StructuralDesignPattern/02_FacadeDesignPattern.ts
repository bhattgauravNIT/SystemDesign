/**
 * 
 * Facade design pattern is used to simplify a larger and complex system of classes, so instead of dealing
 * with multiple classes to perform an action, they can interact with one single facade class, so facade class
 * acts as a wrapper which hides the complexities associated with individual classes and provide a simpler unified approach
 * to the problem.
 * 
 * Lets understand this with help of an example,
 * 
 * say we have a home theater so home theater can have multiple things like amplifier, projector, dvd, sound system etc.
 * Now say we want to watch a movie so ideally what we need to do is turn on dvd, turn on projector, turn on sound system,
 * turn on amplifier and play dvd. These are all the task associated with watching a movie, similarly if we want to turn off
 * home theater than we have to turn off dvd, turn off projector, turn off sound system, turn off amplifier, these are
 * all the task associated with turing off a home theater.
 * 
 * So instead of user interacting with all these classes like amplifier, projector, dvd, sound system we can create a facade
 * class which interacts and take care of all these things whereas the user just interacts with this single facade class.
 * 
 * This is the intuition of facade design pattern.
 * 
 * Lets understand it better with code.
 * 
 * So we have classes like amplifier, projector, dvd , sound system and all classes have its own set of functionalities
 * like they can be turned off , turned on , played etc.
 * 
 * Instead of the user directly interacting with these classes in order to use HomeTheater we have created a facade of 
 * HomeTheater and this deals with handling all these classes internally like playing a homeTheater needs
 * amplifier to be turned on, projector to be turned on, dvd to be turned on and sound system to be turned on and
 * dvd to be played.
 * 
 * In this way we have limited the interaction of user to facade class only which takes cares of everything and
 * provided a simpler unified approach to the problem.
 * 
 */

class Amplifier {
    turnOff() {
        console.log("Turning amplifier off");
    }

    turnOn() {
        console.log("Turning amplifier on");
    }
}

class Projector {
    turnOff() {
        console.log("Turning projector off");
    }

    turnOn() {
        console.log("Turning projector on");
    }
}

class Dvd {
    turnOff() {
        console.log("Turning Dvd off");
    }

    turnOn() {
        console.log("Turning Dvd on");
    }

    play() {
        console.log("Playing dvd");
    }
}

class SoundSystem {
    turnOff() {
        console.log("Turning sound system off");
    }

    turnOn() {
        console.log("Turning sound system on");
    }
}

class HomeTheaterFacade {

    private amplifier: Amplifier;
    private projector: Projector;
    private dvd: Dvd;
    private soundSystem: SoundSystem;

    constructor(amplifier: Amplifier, projector: Projector, dvd: Dvd, soundSystem: SoundSystem) {
        this.amplifier = amplifier;
        this.projector = projector;
        this.dvd = dvd;
        this.soundSystem = soundSystem;
    }

    playHomeTheater() {
        this.amplifier.turnOn();
        this.projector.turnOn();
        this.dvd.turnOn();
        this.soundSystem.turnOn();
        this.dvd.play();
    }

    turnOffHomeTheater() {
        this.amplifier.turnOff();
        this.projector.turnOff();
        this.dvd.turnOff();
        this.soundSystem.turnOff();
    }
}

let amplifier: Amplifier = new Amplifier();
let projector: Projector = new Projector();
let dvd: Dvd = new Dvd();
let soundSystem: SoundSystem = new SoundSystem();
let homeTheater: HomeTheaterFacade = new HomeTheaterFacade(amplifier, projector, dvd, soundSystem);
homeTheater.playHomeTheater();
homeTheater.turnOffHomeTheater();