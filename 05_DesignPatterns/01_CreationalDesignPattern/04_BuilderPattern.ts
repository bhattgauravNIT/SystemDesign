/**
 * Builder pattern is used to create complex objects in multi step process like method chaining
 * while the overall process of object creation remains same.
 * Lets understand a situation where a class constructor needs multiple parameters, thus it becomes very difficult
 * to remember the sequence of these parameters during object creation and moreover if some of these parameters are 
 * even optional then again it can cause a complex scenario for creation of object. In such situations builder pattern is used.
 * 
 * 
 * In below example we are creating a car class which needs many parameters like engine, wheels, stereoSystem and sunroof
 * now stereo system and sunRoof are optional parameters. We have considered only 4 parameters but lets consider a situation
 * in which it needs 20 parameters and out of which some are optional as well, then it will be very difficult to create
 * object of this type of class and thus we used builder pattern.
 * 
 * So we have all parameters private and we have used a private constructor in car class to enforce the use of
 * CarBuilder class which is a static inner nested class within car class.
 * 
 * Now this private parameterized constructor sets the parameters which are needed to build the car and has a getCarDetails
 * method which gives me the details of this car.
 * 
 * Now we have a static nested class known as CarBuilder, its constructor takes are the required parameters which
 * the car needs to be build like in this case engine and wheels and set them to the instance variables present inside
 * the static nested CarBuilder class.
 * 
 * For the optional parameters it has set methods like setStereoSystem, setSunRoof and they return this i,e the current
 * instance for method chaining.
 * 
 * Now this nested static CarBuilder class also has a buildCar method which creates a new instance of car class using new Class,
 * since this is nested within the car class thus it can access the car's class private constructor.
 * 
 * Now we can create this complex object using
 * 
 * new Car.CarBuilder("v8", 4)        // here we have passed the two mandatory parameters
 * .setStereoSystem(true)             // here we are using method chaining and setting the optional param stereoSystem
 * .setSunRoof(true)                  // // here we are using method chaining and setting the optional param stereoSystem
 * 
 * Since we are using method chaining and thus the order to set the optional parameters does not matter.
 * 
 */

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