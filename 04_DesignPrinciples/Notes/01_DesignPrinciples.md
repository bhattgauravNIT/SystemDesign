While designing any system there are some set of principles if followed leads to the application being 
more robust, modular, easier to maintain and scalable. Such principles are termed as SOLID principles
and helps in addressing challenges like code duplication, tight coupling etc.

SOLID principles are :

S -> Single responsibility Principle

O -> Open close principle

L -> Liskov substitution principle

I -> Interface segregation principle

D -> Dependency inversion principle.


**Single Responsibility principle**

Single responsibility principle states that a single class should have a single responsibility and thus only
one reason to change.

Lets take an example, if i m building a website for a restaurant, so i created a class restaurant
now inside this class only i introduced logic for order handling and receipt generation say for example.

Now everything is working fine, after some time I came up with a requirement that i need to alter
the receipt generation logic as tax/gst norms got altered, so again i have to go to restaurant class and
change logic of this method in restaurant class, this can have an impact over other working functionalities and thus
again tis class needs to be tested thoroughly e-e, if in case the single responsibility principle would have been
followed here then, a separate receipt class would have been there, which we needed to modify and then only e-e testing
was needed for receipt class and overall high level testing for rest of application as always.

In this way its always better to have classes/components which serves a single responsibility.

As in below code

class Restaurant {
    name: string;
    location: string;
    contactNumber: string;
    openTimings: string;
    closeTimings: string;
    isOpen: boolean;
    menu: Menu;
    receipt: Receipt;

    constructor() { };
}

class Menu {
    burgers: Burger;
    softDrink: SoftDrink;
}

class Burger { };

class SoftDrink { };

class Receipt { };

All different classes server a single responsibility of their own.


**Open closed principle**

Open closed principle states that a class should be open for extension but closed for modification.
So lets suppose I have a class which serves a single responsibility principle and now a new feature needs to be 
introduced so the existing class logic should not be altered i,e this class should not be open for modifications but however
it should be open for extension.

Lets understand this with help of an example, we have a discount class which calculated discounts for various types of customers

so it for now looks like

class Discount {
    constructor() { };

    getDiscount(spending: number, customerType: string) {
        if (customerType === "general") {
            return spending;
        } else if (customerType === "premium") {
            return spending * 0.8;
        }
    }
}

The problem with this design is as of now i only have two type of customer i,e general and premium and 
in case in future let us suppose one more category of customer has to be introduced say VIp then i have to alter the getDiscount method of Discount class by adding another if else condition but however according to openClose principle a 
class should not be open for modification.

Thus in order to solve this problem

the code should ideally be refactored as

We have a DiscountStrategy which is a interface and provide declaration for applyDiscount method.
The all different types of customers like Premium , VIp or general classes implements this interface 
and thus override or provide their own implementation for this function applyDiscount.
 
Now the Discount class has a aggregation relationship with interface DiscountStrategy and expects an
instance/reference of DiscountStrategy in its constructor.
 
Since the task is to provide various types of customers to Discount class and type of customers can vary thus we
can't direct create a dependency of discount class over any specific type of customer like Premium , Vip etc.
Thus we have created a aggregation of Discount and discount strategy interface. We can't directly create
object from interface but however if a Class is implementing that interface than the object of that class can also
act as reference to that interface and thus we can pass different types of customers via using this concept.
 
Now the discount class has a applyDiscount method and thus this definition has invocation to specific applyDiscount method
of that class which is invoking it.
 
Now this design is following the open closed principle as if a new type of customer is introduced than we don't need 
to change or modify any existing code rather just simply create a new class and make it implement its own discount strategy.

interface DiscountStrategy {
    applyDiscount(price: number): number;
}

class Premium implements DiscountStrategy {
    applyDiscount(price: number): number {
        return price * 0.8;
    }
}

class VIP implements DiscountStrategy {
    applyDiscount(price: number): number {
        return price * 0.7;
    }
}

class General implements DiscountStrategy {
    applyDiscount(price: number): number {
        return price;
    }
}

class Discounts {

    private strategy: DiscountStrategy;

    constructor(strategy: DiscountStrategy) {
        this.strategy = strategy;
    }

    applyDiscount(price: number) {
        return this.strategy.applyDiscount(price);
    }
}

let premium = new Discounts(new Premium());
console.log(premium.applyDiscount(100));

let vip = new Discounts(new VIP());
console.log(vip.applyDiscount(100));

let general = new Discounts(new General());
console.log(general.applyDiscount(100));


**Liskov substitution principle**

Liskov substitution principle states that if there are two classes such that one is a subclass and other is a
parent class, then we should be able to replace object of parent class with object of sub class
without breaking the functionality or If a class B is a subclass of A, 
then we should be able to use an instance of B wherever instance of A is expected.

Lets consider an example in which Liskov substitution principle is violated.

In this example liskov substitution principle is violated, 

we have a Bird class which acts as a parent class for Sparrow class and Penguin class.
Now sparrow class extends Bird class and has a method fly which is fine as sparrows can fly.
Now penguin class also extends Bird class and has a method fly which is not fine as penguin can't fly.

We have a method makeBirdsFly which takes instance of Bird or the parent class, since there are many kind of birds like 
sparrow, penguin and thus all child classes extending Birds can alo be passed as reference in makeBirdsFly
method which is expecting an reference of Bird class.

Now since here we are replacing the object of Bird class with object of specific subclass object in makeBirdsFly
method thus we are trying Liskov Substitution principle but making this substitution via substituting parent class object
with sub class object the functionality is breaking as penguins can't fly thus its a violation of LSP.


class Bird {
    fly() {
        console.log("flying");
    }
}

class Sparrow extends Bird {
    fly() {
        console.log("sparrow is flying");
    }
}

class Penguin extends Bird {
    fly() {
        throw new Error("penguin can't fly");
    }
}

function makeBirdsFly(bird: Bird) {
    bird.fly();
}

let sparrow = new Sparrow();
makeBirdsFly(sparrow);

let penguin = new Penguin();
makeBirdsFly(penguin);


In order to fix the above problem the correct way is to refactor the above code as.
 
Now Birds is an abstract class which has a method declaration of makeVoice, now we have a interface fly
which provides declaration of fly method.
 
Sparrow class can extend Birds and implement fly method however penguin class can only extend Birds but
can't implement fly as penguin don't fly.
 
Now both penguin and sparrow are subclasses of Birds and our function makeBirdsFly1 expects birds which
can fly , all birds cant fly but all birds will be extending Birds class for sure and thus wherever we 
can place a Birds object we can substitute it with its sub class object and no functionality is broken and thus
This is an ideal example of liskov substitution principle.
 

abstract class Birds {
    makeVoice() { }
}

interface fly {
    fly(): void;
}

class Sparrows extends Birds implements fly {
    fly(): void {
        console.log("sparrows can fly");
    }

    makeVoice(): void {
        console.log("sparrow voice");
    }
}

class Penguins extends Birds {
    makeVoice(): void {
        console.log("penguin voice");
    }
}

function makeBirdsFly1(birds: fly) {
    birds.fly();
}

let sp1 = new Sparrows();
makeBirdsFly1(sp1);

// let pg1 = new Penguins();
// makeBirdsPerform(pg1);   compile time error itself


**Interface segregation principle**

client should not be forced to implement interface whose all functionality it don't need to use.

Lets take an example in which Interface segregation principle is violated.

So in a restaurant, there are some kitchen work like, cooking, cleaning, serving.
Now we have a cook class and this cook class does cooking and cleaning so he implements the interface
kitchenTask but however serving task he don't do but since he is implementing kitchenTask interface and thus he is
forced to implement serving method.

Similarly a waiter also does kitchenTask and thus he implements kitchenTask interface but since he only does serving\
and he has implemented kitchenTask interface and thus we is forced to implement cooking and cleaning.

interface kitchenTask {
    cooking(): void;
    cleaning(): void;
    serving(): void;
}

class Cook implements kitchenTask {
    cooking(): void {
        console.log("cooking task")
    }
    cleaning(): void {
        console.log("cleaning task");
    }
    serving(): void {
        throw new Error("Method not implemented.");
    }

}

class Waiter implements kitchenTask {
    cooking(): void {
        throw new Error("Method not implemented.");
    }
    cleaning(): void {
        throw new Error("Method not implemented.");
    }
    serving(): void {
        console.log("serves");
    }

}

This represents violation of interface segregation principle thus in order to fix this , the client should not be 
forced to implement any interface whose functionality it don't use and thus we can refactor it as

now we have implemented segregated interfaces and since cook needs only cleaning and cooking thus it implements
cookable and cleanable similarly waiter needs only serving so he implements servable.
Thus it now in lines with Interface segregation principle.

interface cookable {
    cook(): void;
}

interface cleanable {
    clean(): void;
}

interface servable {
    serve(): void;
}

class Cooks implements cookable, cleanable {
    clean(): void {
        console.log("clean")
    }
    cook(): void {
        console.log("cook");
    }

}

class Waiters implements servable {
    serve(): void {
        console.log("serve");
    }
}


**Dependency Inversion Principle**

Dependency inversion principle states that a high level module should not be directly dependent upon a low level
module and vice versa. This helps in decoupling or helps in reduction of tight coupling between modules.

Lets understand this with help of an example.

In my application to save the user we are using sql database but later there may arise a situation in which we need to
use mongo db or even some needs to be saved in mongo db and some needs to be saved in sql itself.

If we write the code like below it would be a violation of dependency inversion principle as the low level module
which is our database class is tightly coupled or is directly dependent upon the high level module or the user class
and thus if we need to change to mongo db later it would case change in the low level as well as the high level module.

// Low level module
class Sql {
    save(data: any) {
        console.log("saving data to sql servers");
    }
}


//High level module
class User {
    sql: Sql;
    constructor() {
        this.sql = new Sql();
    }

    save(data: any) {
        this.sql.save(data)
    }
}


Since this is a problem and thus we need to follow dependency inversion principle , thus we will refactor the code
to something like.
 
Now there is no direct dependency between the low level module Sql1, MongoDb and the highLevel module User1.
Instead there is a abstraction between them i,e Database interface.
 
Now this user class takes a reference of the interface and since mongo db and sql1 class both implement
this interface thus the reference of these classes can also be passed as reference for Database interface since
we can't create object of interface directly.
 
Now based on the reference passed like sql1 or mongoDb that specif save method gets invoked. 

interface Database {
    save(data: any): void;
}

// low level module
class Sql1 implements Database {
    save(data: any): void {
        console.log("saving data to sql servers");
    }
}

//low level module
class MongoDb implements Database {
    save(data: any): void {
        console.log("saving data to mongodb");
    }
}

//high level module
class User1 {
    database: Database;
    constructor(database: Database) {
        this.database = database;
    }

    save(data: any) {
        this.database.save(data);
    }
}

let user = new User1(new Sql);
user.save("data");

let user1 = new User1(new MongoDb);
user1.save("data");
