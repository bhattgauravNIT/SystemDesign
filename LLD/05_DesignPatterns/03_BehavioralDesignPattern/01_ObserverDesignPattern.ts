/**
 * 
 * Observer design pattern is a behavioral design pattern which helps in improving the communication between the
 * objects.
 * 
 * Let's consider a real life example, we went to a store and asked for a specif product but that product was not available
 * at that time, so we asked the store owner to inform us or let us know once its available.
 * 
 * Now consider multiple people like me waiting to be notified by the store owner about the product availability.
 * One way is that I keep on visiting the store every day to get an update, in the same way all n people who want the 
 * product should do it, but this is difficult and not possible. Another way is the once the product is available the
 * shop owner notifies us and all the rest people who were willing to get that product and its a ideal way.
 * 
 * This what's happen in Observer design pattern.
 * 
 * 
 * Lets understand it better with coding example, I am the weather central station who takes data from satellite etc, 
 * now there are multiple websites for weather prediction, multiple apps for wether prediction which takes data from me and
 * show it in their websites or apps.
 * 
 * Now suddenly we in weather central station got to know that in 1 hour a earthquake is about yo hit , so its my responsibility
 * to immediately notify them.
 * 
 * One way for them to be notified is that they keeps on making api calls to my system after every 10 mins to get the current
 * weather forecast data, but its an overhead for them to continuously keep making api calls in regular interval. Similarly
 * its an overhead for me to keep continuously responding to n number of api calls after every 10 mins, rather than this approach,
 * as soon as I have a new update i will update all the n observers of the weather data on my own. This is where observer design 
 * pattern comes into picture.
 * 
 * So me who want to notify others is a publisher or a subject
 * The people who needs the updates or my clients are the subscribers or the observers.
 * 
 * 
 * Lets understand this with help of code:
 * 
 * WeatherCentralHub is the subject or publisher but there can be a scenario that there are multiple publishers even so
 * we have created a class WeatherSubject which can be extended by all the weather publishers/subjects.
 * 
 * Our class WeatherSubject has list of observers whom we need to notify regarding the updates.
 * Now observers like weather app or weather website are placed under one hood via Observer interface which has a method declaration
 * update.
 * 
 * Now  WeatherSubject class has addObserver which can add new observers to the list and a method remove observer too which
 * can remove observer from the list.
 * 
 * It has a notify method which is used to notify all the observers.Now since every observer like WetherForCastingApp or
 * WetherForCastingWebsite are reference of ObserverInterface thus they have to implement it and provide definition 
 * to update method. 
 * 
 * Now this notify method which is used to notify all the observers in Weather subject will iterate over list
 * of all observers and will call update method on these observers.
 * 
 * The class WeatherCentralHub is a publisher/subject and it extends WeatherSubject, this class takes data like
 * humidity, temp and willRain which say may be coming from satellite.
 * 
 * Now as soon as data coming from satellite on WeatherCentralHub changes or in our scenario for replication whenever
 * an object of WeatherCentralHub gets created then it means there is a change in data and thus the constructor of this 
 * class invokes method updateChangedData which in turns calls for notify method of its superclass.
 * 
 * Now on every observer class like WetherForCastingApp its constructor needs an instance of its subject i,e WeatherCentralHub
 * in our case and the constructor also invoke the addObserver method of instance of WeatherCentralHub to add this particular
 * observer to list of observers.
 * 
 */

interface Observer {
    update(): void;
}

class WeatherSubject {
    private observers: Observer[] = [];

    addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    removeObserver(observer: Observer) {
        this.observers = this.observers.filter((val) => val !== observer)
    }

    notify() {
        for (const clients of this.observers) {
            clients.update();
        }
    };
}

class WeatherCentralHub extends WeatherSubject {
    private humidity: number;
    private temp: string;
    private willRain: boolean;

    constructor(humidity: number, temp: string, willRain: boolean) {
        super();
        this.humidity = humidity;
        this.temp = temp;
        this.willRain = willRain;
        this.updateChangedData();
    }

    private updateChangedData(): void {
        this.notify();
    }

    getHumidity(): number {
        return this.humidity;
    }

    getTemp(): string {
        return this.temp;
    }

    getWillRain(): boolean {
        return this.willRain;
    }
}

class WetherForCastingApp implements Observer {
    weatherCentralHub: WeatherCentralHub;

    constructor(weatherCentralHub: WeatherCentralHub) {
        this.weatherCentralHub = weatherCentralHub;
        this.weatherCentralHub.addObserver(this)
    };

    update(): void {
        console.log(`
        Todays weather is having ${this.weatherCentralHub.getHumidity()} 
        humidity with ${this.weatherCentralHub.getTemp()}
        temperature and there are will be rain ${this.weatherCentralHub.getWillRain()}`)
    }
}

class WetherForCastingWebsite implements Observer {
    weatherCentralHub: WeatherCentralHub;

    constructor(weatherCentralHub: WeatherCentralHub) {
        this.weatherCentralHub = weatherCentralHub;
        this.weatherCentralHub.addObserver(this)
    };

    update(): void {
        console.log(`
        Todays weather is having ${this.weatherCentralHub.getHumidity()}
        humidity with ${this.weatherCentralHub.getTemp()}
        temperature and there are will be rain ${this.weatherCentralHub.getWillRain()}`)
    }
}



let weatherCentralHub = new WeatherCentralHub(21, "32 Degree Celsius", false);
let wetherForCastingApp: Observer = new WetherForCastingApp(weatherCentralHub);
let wetherForCastingWebsite: Observer = new WetherForCastingWebsite(weatherCentralHub);
weatherCentralHub.notify();
