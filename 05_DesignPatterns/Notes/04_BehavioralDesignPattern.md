**Behavioral design pattern**

Behavioral design pattern helps improving the communication between objects while maintaining loose
coupling between them.

ex: 

1. **Observer Design pattern**

Observer design pattern is a behavioral design pattern which helps in improving the communication between the
objects.

Let's consider a real life example, we went to a store and asked for a specif product but that product was not available
at that time, so we asked the store owner to inform us or let us know once its available.

Now consider multiple people like me waiting to be notified by the store owner about the product availability.
One way is that I keep on visiting the store every day to get an update, in the same way all n people who want the 
product should do it, but this is difficult and not possible. Another way is the once the product is available the
shop owner notifies us and all the rest people who were willing to get that product and its a ideal way.

This what's happen in Observer design pattern.


Lets understand it better with coding example, I am the weather central station who takes data from satellite etc, 
now there are multiple websites for weather prediction, multiple apps for wether prediction which takes data from me and
show it in their websites or apps.

Now suddenly we in weather central station got to know that in 1 hour a earthquake is about yo hit , so its my responsibility
to immediately notify them.

One way for them to be notified is that they keeps on making api calls to my system after every 10 mins to get the current
weather forecast data, but its an overhead for them to continuously keep making api calls in regular interval. Similarly
its an overhead for me to keep continuously responding to n number of api calls after every 10 mins, rather than this approach,
as soon as I have a new update i will update all the n observers of the weather data on my own. This is where observer design 
pattern comes into picture.

So me who want to notify others is a publisher or a subject
The people who needs the updates or my clients are the subscribers or the observers.


Lets understand this with help of code:

```typescript
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
```

WeatherCentralHub is the subject or publisher but there can be a scenario that there are multiple publishers even so
we have created a class WeatherSubject which can be extended by all the weather publishers/subjects.

Our class WeatherSubject has list of observers whom we need to notify regarding the updates.
Now observers like weather app or weather website are placed under one hood via Observer interface which has a method declaration
update.

Now  WeatherSubject class has addObserver which can add new observers to the list and a method remove observer too which
can remove observer from the list.

It has a notify method which is used to notify all the observers.Now since every observer like WetherForCastingApp or
WetherForCastingWebsite are reference of ObserverInterface thus they have to implement it and provide definition 
to update method. 

Now this notify method which is used to notify all the observers in Weather subject will iterate over list
of all observers and will call update method on these observers.

The class WeatherCentralHub is a publisher/subject and it extends WeatherSubject, this class takes data like
humidity, temp and willRain which say may be coming from satellite.

Now as soon as data coming from satellite on WeatherCentralHub changes or in our scenario for replication whenever
an object of WeatherCentralHub gets created then it means there is a change in data and thus the constructor of this 
class invokes method updateChangedData which in turns calls for notify method of its superclass.

Now on every observer class like WetherForCastingApp its constructor needs an instance of its subject i,e WeatherCentralHub
in our case and the constructor also invoke the addObserver method of instance of WeatherCentralHub to add this particular
observer to list of observers.


2. **Template Design pattern**

In order to understand template design pattern, lets consider a scenario.
We need to make tea and we need to make coffee, so lets write down the steps to make tea and to make coffee
respectively.

Tea:

Boil water
AddTea
Add condiments for tea
Pour in cup
serve
 
Coffee:

Boil water
Brew
Add condiments for coffee
Pour in cup
Serve

Now if we see there are some methods which remains common in both the process, i,e Boil water, Pour in cup and Serve
however some methods depend upon each individual tea or coffee preparation like AddTea in tea prep, add condiments of tea like
cardamon etc whereas in coffee they are brew the coffee, add condiments of coffee like coffee powder etc.

In such type of scenario one way to solve the problem is to use separate classes for tea and coffee and define all the methods
individually in each class however it violates DRY principle i,e Do not repeat yourself. As the methods which are common in both
of the preparations will be repeated in both the classes and this is simply code duplication.

Another way is to create one interface and declare these common methods there and make each class implement it and provide method
definition to each common method, but these common methods have same definition too in each of the class thus again its code 
repetition and thus we need to create an abstract class where these common methods will be provided with method definition as well
and make the individual classes extend this abstract class and get the common methods from this , however they can individually
provide the uncommon or class specific methods in their own classes.

```typescript
abstract class Process {
    boilWater(): void {
        console.log("Boiling water");
    }

    pourInCup(): void {
        console.log("Pouring in cup");
    }

    server(): void {
        console.log("serving");
    }
}

class Tea extends Process {
    addTea(): void {
        console.log("Adding tea");
    }

    addCondiments() {
        console.log("adding milk, sugar and cardamon");
    }
}

class Coffee extends Process {
    brewCoffee(): void {
        console.log("Adding coffee");
    }

    addCondiments() {
        console.log("adding milk, sugar and coffee powder");
    }
}

let tea: Tea = new Tea();
tea.boilWater();
tea.addTea();
tea.addCondiments();
tea.pourInCup();
tea.server();

let coffee: Coffee = new Coffee();
coffee.boilWater();
coffee.brewCoffee();
coffee.addCondiments();
coffee.pourInCup();
coffee.server();
```

3. **Iterator Design pattern**

Iterator design pattern is used to iterate over underlying collection of a class without letting
the client know regarding the underlying structure of the collection like array, set, map which should be iterated.

Lets take an example;

We have a library which can store books, now suppose the client wants to get details of all the books
which are stored in library, in case we have the getDetails method in library and it returns an array containing
the books, then the client will get back the array and then they have to traverse over it.

Now suppose some fine day we decide to change the inner data structure from array to something else, then client also
has to change their whole traversal process code and if there are n number of clients than it will be very difficult for
all the n clients to change their traversal logic so in such situations the iterator design pattern comes into picture.

In iterator design pattern we have 

1. An iterator interface which will have two method declaration 
   hasNext()
   next()

2. Container which in an interface and have method declaration 
   getIterator()

Now in iterator interface hasNext should be of return type boolean as it tells if the
iterable is having another element or not, left to iterate. The next() method has a return type of the type
or iterator which we are traversing since at time of declaration we don't know so we consider it generic type i,e T but
it can be null as well in case it don't have a next and thus its T or null.

interface Iterators<T> {
 hasNext(): boolean;
 next(): T | null;
}

Now the container has getIterator method which give me an iterator as name suggest so it should have a return type
Iterator and since Iterator expects a datatype thus we consider it also generic so return type is Iterator<T>

 interface Container<T> {
 getIterator(): Iterators<T>;
}

Now we have a book class which has a name and a getName method simple.
We have a library class which will store all the books, so we have an array of Books and at time
of library instantiation we initialize this array as empty array i,e lazy loading. 

Now it has a add book which takes a book type and add it to the books array.
Since user will be interacting with library only and thus they need an iterator so Library class
implements Container interface which has a getIterator and thus Library class will override this method.
Thus getIterator has to return an Iterator reference.

Now Book class don't implement Iterator interface and thus it can't act as a reference and thus we
crated an BookIterator class now this class implements Iterator and thus over ride hasNext and next method.
bookIterator class now expects array of Book which needs to be iterated , for iteration we kept a class
instance i initialized to 0.

hasNext check the current value of i, if its less than the length of books array it returns true else false.
next return the current array of indexed element and increment i.

Now coming back to getIterator method of Library class which should return a reference of Iterator,
so now it return new instance of BookIterator as pass the array of books in its constructor.
Now the client can create instance of library.
Add multiple books to it.

Then can call getIterator of library class which returns BookIterator.
Since book Iterator has has next method so till it has next we keep iterating
using iterator.next which returns an book object and thus we can get Details of the book.
So in summary, in order to create an iterator Design we need
1) An iterator interface with hasNext and next method
2) An container interface to getIterator

```typescript
interface Iterators<T> {
    hasNext(): boolean;
    next(): T | null;
}

interface Container<T> {
    getIterator(): Iterators<T>;
}

class Book {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }
}

class BookIterator implements Iterators<Book> {
    i = 0;
    books: Book[];

    constructor(books: Book[]) {
        this.books = books;
    }

    hasNext(): boolean {
        return this.i < this.books.length;
    }

    next(): Book | null {
        return this.hasNext() ? this.books[this.i++] : null;
    }
}

class Library implements Container<Book> {
    private books: Book[];

    constructor() {
        this.books = [];
    }

    addBooks(book: Book) {
        this.books.push(book);
    }

    getIterator() {
        return new BookIterator(this.books);
    }
}

let library = new Library();
library.addBooks(new Book("DSA"));
library.addBooks(new Book("PSA"))
library.addBooks(new Book("GSA"))
library.addBooks(new Book("SSA"))
library.addBooks(new Book("QSA"))

let iterator: Iterators<Book> = library.getIterator();
while (iterator.hasNext()) {
    let book: Book | null = iterator.next();
    console.log(book?.getName());
}
```


4. **Strategy Design pattern**

Strategy pattern helps us to bind multiple algorithms together in our unit at run time i,e through
dynamic method dispatching. Once the client mentions the strategy/algorithm through which he needs that
work to be done, the work gets done by that strategy.

Lets consider an example.

We are a payment gateway and we can provide payments through multiple ways like
credit card, paypal, net banking , upi etc.

So there are all the strategies through which payment can be done , thus we will design this system in such a
way that if later a new payment mode is introduced then even we will respect all the SOLID principles.

Now all different strategies of payment can be through credit card, net banking and paypal as of now
we create three class each of each strategy.

Now we bind them together using an interface Payment for dynamic method dispatching.

Now the paymentGateway takes an reference of one of these strategies through the client and call the
makePayment accordingly for the respective strategy.  


```typescript
interface Payment {
    makePayment(amount: number): void;
}

class CreditCard implements Payment {

    makePayment(amount: number): void {
        console.log(`Making payment of ${amount} through Credit card`)
    }

}

class Paypal implements Payment {

    makePayment(amount: number): void {
        console.log(`Making payment of ${amount} through paypal`)
    }

}

class NetBanking implements Payment {

    makePayment(amount: number): void {
        console.log(`Making payment of ${amount} through net banking`)
    }

}

class PaymentGateway {
    private payment: Payment;

    setPaymentStrategy(payment: Payment) {
        this.payment = payment;
    }

    makePayment(amount: number) {
        this.payment.makePayment(amount);

    }
}

let pg = new PaymentGateway();
pg.setPaymentStrategy(new CreditCard());
pg.makePayment(20);

pg.setPaymentStrategy(new NetBanking());
pg.makePayment(100);

pg.setPaymentStrategy(new Paypal());
pg.makePayment(300);
```