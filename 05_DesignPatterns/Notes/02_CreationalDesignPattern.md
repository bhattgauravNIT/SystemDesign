**Creational design pattern**

Creational design pattern deals with multiple object instantiation of different types such that it enhances usability.

Ex: 

1) **Factory Pattern:**

Factory pattern is a creational design pattern and is generally used in situations where multiple objects
needs to be created of different types.

So in factory pattern there exists a common method which is responsible for creating different objects
and this method act as single point form where objects of different types can get instantiated.
Its a encapsulation as its a single place which deals with all kinds of object creation.

Lets understand this with help of an example below:
 
We have a Shapes class which is having a draw method and a constructor.
Now this class act as parent class for various different shapes like Rectangle, circle and square.
So we have respective subClasses of Circle, rectangle and square which extends Shapes class and override the
draw method of parent Shapes class in their respective subClasses.
 
Now we have used a factory pattern in which a ShapeFactory class is responsible for creation of multiple
objects of different types.
 
So inside ShapeFactory we have a createShapes method which takes the name of the shape as argument and
then creates the respective instances based on this condition.
 
Now in the main we have first created an instance of the ShapeFactory and then is invoking the createShapes
method of it by passing the argument that which shape we need to make.
 
Now this method returns an object and thus we have an instance of the class which we needed without actually knowing
the class name and just simply using factory, thus in a way we have abstracted the object creation by hiding its implementations
details and also encapsulated the object creation within a single class.


class ShapeFactory {
    createShapes(shapes: String) {
        if (shapes !== '') {
            if (shapes === 'Circle') {
                return new Circle();
            } else if (shapes === 'Rectangle') {
                return new Rectangle();
            } else if (shapes === 'Square') {
                return new Square();
            }
        }
        else { return null };
    }
}

class Shapes {
    constructor() { };
    draw() {
        console.log("draw shapes which you like")
    }
}

class Circle extends Shapes {
    constructor() {
        super();
    };

    draw() {
        console.log("drawing a circle");
    }

}

class Rectangle extends Shapes {
    constructor() {
        super();
    }

    draw() {
        console.log("drawing a rectangle");
    }
}

class Square extends Shapes {
    constructor() {
        super();
    }

    draw() {
        console.log("drawing a square");
    }
}

let factory: ShapeFactory = new ShapeFactory();
let shape1: Shapes | undefined | null = factory.createShapes("Circle");
shape1?.draw();

let shape2 = factory.createShapes("Rectangle");
shape2?.draw();

let shape3 = factory.createShapes("Square");
shape3?.draw();


2) **Constructor Design Pattern:**

Constructor design pattern is simple and it deals with creation of instances of classes using constructor.
These constructor can either be a normal non parametrized constructor or a parametrized constructor.
Lets consider example below in which Human class has a non parametrized constructor whereas the Person class
which extends Human class has a parametrized constructor.
 

class Human {
    constructor() {
        console.log("created an object of Human")
    }
}

class Person extends Human {

    name: string;
    age: number;

    constructor(name: string, age: number) {
        super();
        this.name = name;
        this.age = age;
        console.log(`created a Person of name ${name} and age ${age}`);
    }
}

let human = new Human();
let person = new Person("Gaurav", 27);


3) **SingleTon pattern:**

Singleton pattern is used when we want to create a single instance of a class and it acts as an global reference and thus
next time when we wish to use it, this same first instance only its getting used.
 
Lets understand this with an example, logger which are used to log the logs in applications generally uses only a single 
instance as we don't need to create multiple objects for it and thus we use singleton design pattern in it.
 
So Logger class is having an static instance variable logger of Logger class itself. The constructor is kept as private
so that no new instances can get created via user and a static method getInstance is present which is responsible for
object creation of Logger class in class this logger instance variable is null or undefined, in case its not null or undefined
then we simply return this instance only and thus single instance is getting shared all the way across.
 
We have a getLogs method which prints the logs.

So now when we did
 
let log1: Logger | undefined = Logger.getInstance();
 
so at this time logger instance member of Logger class was null or undefined and thus a new instance of logger class
get created as Logger.logger = new Logger();
and constructor printed "Logger instance created"
 
now when we called getLog using this reference of instance of Logger class i,e 
log1?.getLog("This is first log and object gets created as initially object was null"); 
 
"This is first log and object gets created as initially object was null" gets printed.

Now when we second time did let log2: Logger | undefined = Logger.getInstance();
 
this time logger instance was not null or undefined and thus the previous instance only gets returned and
then we called getLog using this previous reference only
 
log2?.getLog("This is second log and now new object gets created and the first object only is reused");
 
and thus "This is second log and now new object gets created and the first object only is reused" gets printed.
 
This can be validated as console.log(log1 === log2); is true which means that the type as well as reference value of
both log1 and log2 are same and its a single object only.

class Logger {
    static logger: Logger;

    private constructor() {
        console.log("Logger instance created");
    };

    static getInstance() {
        if (!Logger.logger) {
            Logger.logger = new Logger();
        }
        return Logger.logger;
    }

    getLog(logs: string) {
        console.log(`Logging: ${logs}`);
    }
}

let log1: Logger | undefined = Logger.getInstance();
log1?.getLog("This is first log and object gets created as initially object was null");

let log2: Logger | undefined = Logger.getInstance();
log2?.getLog("This is second log and now new object gets created and the first object only is reused");


class Valid {
    constructor() { };
}

let v1 = new Valid();
let v2 = new Valid();
console.log(v1 === v2);

console.log(log1 === log2);


4) **Builder pattern**

Builder pattern is used to create complex objects in multi step process like method chaining
while the overall process of object creation remains same.
Lets understand a situation where a class constructor needs multiple parameters, thus it becomes very difficult
to remember the sequence of these parameters during object creation and moreover if some of these parameters are 
even optional then again it can cause a complex scenario for creation of object. In such situations builder pattern is used.
 
 
In below example we are creating a car class which needs many parameters like engine, wheels, stereoSystem and sunroof
now stereo system and sunRoof are optional parameters. We have considered only 4 parameters but lets consider a situation
in which it needs 20 parameters and out of which some are optional as well, then it will be very difficult to create
object of this type of class and thus we used builder pattern.
 
So we have all parameters private and we have used a private constructor in car class to enforce the use of
CarBuilder class which is a static inner nested class within car class.
 
Now this private parameterized constructor sets the parameters which are needed to build the car and has a getCarDetails
method which gives me the details of this car.
 
Now we have a static nested class known as CarBuilder, its constructor takes are the required parameters which
the car needs to be build like in this case engine and wheels and set them to the instance variables present inside
the static nested CarBuilder class.
 
For the optional parameters it has set methods like setStereoSystem, setSunRoof and they return this i,e the current
instance for method chaining.
 
Now this nested static CarBuilder class also has a buildCar method which creates a new instance of car class using new Class,
since this is nested within the car class thus it can access the car's class private constructor.

Now we can create this complex object using
 
new Car.CarBuilder("v8", 4)        // here we have passed the two mandatory parameters
.setStereoSystem(true)             // here we are using method chaining and setting the optional param stereoSystem
.setSunRoof(true)                  // // here we are using method chaining and setting the optional param stereoSystem
 
Since we are using method chaining and thus the order to set the optional parameters does not matter.


class Car {
    private engine: string;
    private wheels: number;
    private stereoSystem: boolean;
    private sunRoof: boolean;

    // private constructor to enforce use of CarBuilder.
    private constructor(engine: string, wheels: number, stereoSystem: boolean, sunRoof: boolean) {
        this.engine = engine;
        this.wheels = wheels;
        this.stereoSystem = stereoSystem;
        this.sunRoof = sunRoof;
    }

    getDetails() {
        console.log(`Displaying car details `
            + '\n'
            + `Engine: ${this.engine} `
            + '\n'
            + `Wheels: ${this.wheels} `
            + '\n'
            + `Stereo: ${this.stereoSystem} `
            + '\n'
            + `Sunroof: ${this.sunRoof} `
        );
    }

    static CarBuilder = class {
        private engine: string;
        private wheels: number;
        private stereoSystem: boolean = false;
        private sunRoof: boolean = false;

        constructor(engine: string, wheels: number) {
            this.engine = engine;
            this.wheels = wheels;
        }

        setStereoSystem(isStereoSystem: boolean) {
            this.stereoSystem = isStereoSystem;
            return this;
        }

        setSunRoof(isSunRoof: boolean) {
            this.sunRoof = isSunRoof;
            return this;
        }

        buildCar() {
            return new Car(this.engine, this.wheels, this.stereoSystem, this.sunRoof);
        }
    }
}

let car = new Car.CarBuilder("v8", 4).setStereoSystem(true).setSunRoof(true).buildCar();
car.getDetails(); 


5) **Prototype pattern**

Prototype pattern is used when we need to do prototype inheritance.

In class we use inheritance where a sub class inherits all the property of its parent class.
In the same way if an object wants to inherits the properties from another object then there comes the
concept of prototypical inheritance.
 
Lets take an example
 
we have a car class and it has properties like color, weight, engine and we created an car1 obj,
now let us suppose we need to create a new object of car say car2 but only want to change the color rest of property 
it should inherit from car1 obj then it such cases we use Prototype pattern and prototype inheritance
allows us to do it. So prototype pattern is used when object creation is expensive and require a lot of initializations
however we want to create a new object with starting of properties of old object only. 
 
Lets consider below example:
 
We have a prototype interface which has a method declaration clone, whichsoever class implements it can implement 
clone method which can help creating prototype inheritance amongst its objects.
 
So Car class is having various properties like engine, weight, color and it has a parametrized constructor which
set these instance variables from uer input. Now this Car class implements Prototype interface and provides definition
to clone method.
 
Clone method creates a shallow copy of the object.

So let c1 = new Car("v8", 1200, "blue"); creates a new object with different properties like engine, weight and color.
now when we do 
 
let c2: Car = c1.clone();
 
a shallow copy of c1 object gets returned from clone method with all properties same as old object car1.
Now we can simply change whatever properties we needs to be changed from c1 object, rest every other property will remain
same.
 
c2.color = "green";
 
now if we log c1 and c2 objects we get
 
{ engine: 'v8', weight: 1200, color: 'blue' }
{ engine: 'v8', weight: 1200, color: 'green' }
 
Thus we have accomplished prototype pattern by using prototype inheritance.

interface Prototype {
    clone(): void;
}

class Car implements Prototype {

    engine: string;
    weight: number;
    color: string;

    constructor(engine: string, weight: number, color: string) {
        this.engine = engine;
        this.weight = weight;
        this.color = color;
    }

    clone() {
        return { ...this }
    }

}

let c1 = new Car("v8", 1200, "blue");
let c2: Car = c1.clone();
c2.color = "green";
console.log(c1);
console.log(c2);


6) **Abstract factory pattern**

Abstract factory pattern resembles with factory pattern but however is built on top of it. In factory pattern, 
we provide a single common method which is responsible for object creation or instantiation of multiple different types 
of objects. However, if these multiple different types of objects can be grouped together as a family, then abstract factory pattern is used to create or instantiate these different families of objects of different types.  

Lets understand this with help of an example. We have a company that creates cars as well as bikes. Now within 
this company, they can create two types of cars and bikes, i.e., petrol or electric. Different types of car objects,
which can be electric or petrol, can be considered in one family as they are of type car only. Similarly, different types of 
bike objects, i.e., electric or petrol, can also be grouped as one family as they are of type bike only. So if we use factory pattern to create objects of different types belonging to one family, then it’s abstract factory pattern.  

So let’s understand the code.  

The company can have two products, i.e., car or bike, so we created two interfaces, Car and Bike. Car interface has a drive function, whereas Bike interface has a ride method.  

Now there are two types of cars, i.e., electric cars or petrol cars, so we created two different classes, i.e., ElectricCar and PetrolCar. Both of them implement the Car interface and thus provide a method definition to the drive method of the Car interface.  

Similarly, there are two different types of bikes, i.e., electric bikes or petrol bikes, so we created two different classes, i.e., ElectricBike and PetrolBike. Both of them implement the Bike interface and thus provide a method definition to the ride method of the Bike interface.  

Now, we could have used the factory pattern to create objects of different types of cars and bikes, i.e., objects of ElectricCar, PetrolCar, ElectricBike, and PetrolBike.  

However, we can see that objects of ElectricCar and PetrolCar belong to the same family of cars, and similarly, objects of ElectricBike and PetrolBike also belong to the same family of bikes.  

Thus, we created a VehicleFactory interface, which has two method declarations, i.e., createCar and createBike.  

Now, we have created two different factories, i.e., PetrolFactory and ElectricFactory.  

PetrolFactory implements VehicleFactory and returns new PetrolCar or PetrolBike respectively. Similarly, ElectricFactory implements VehicleFactory and returns new ElectricCar or ElectricBike respectively.  

Now, we have a function createFactory, which, based on the type passed, differentiates whether it needs to return an ElectricFactory object or a PetrolFactory object.  

Based on that factory’s object, that particular type of car or bike can be created.  


interface VehicleFactory {
    createCar(): Car;
    createBike(): Bike;
}

class ElectricFactory implements VehicleFactory {
    createCar(): Car {
        return new ElectricCar();
    }
    createBike(): Bike {
        return new ElectricBike()
    }
}

class PetrolFactory implements VehicleFactory {
    createCar(): Car {
        return new PetrolCar();
    }
    createBike(): Bike {
        return new PetrolBike()
    }
}

interface Car {
    drive(): void;
}

interface Bike {
    ride(): void;
}

class ElectricCar implements Car {
    drive(): void {
        console.log("Driving electric car")
    }

}

class PetrolCar implements Car {
    drive(): void {
        console.log("Driving petrol car")
    }
}

class ElectricBike implements Bike {
    ride(): void {
        console.log("Riding electric bike")
    }

}

class PetrolBike implements Bike {
    ride(): void {
        console.log("Riding petrol bike")
    }
}

function createVehicles(type: string) {
    if (type === 'Electric') {
        return new ElectricFactory();
    } else if (type === 'Petrol') {
        return new PetrolFactory();
    } else {
        return null;
    }
}

let electricFactory = createVehicles("Electric");
let eCar = electricFactory?.createCar();
let eBike = electricFactory?.createBike();
eCar?.drive();
eBike?.ride();

let petrolFactory = createVehicles("Petrol");
let pCar = petrolFactory?.createCar();
let pBike = petrolFactory?.createBike();
pCar?.drive();
pBike?.ride();
