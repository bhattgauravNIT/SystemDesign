/**
 * 
 * Abstract factory pattern resembles with factory pattern but however is build on top of it, in factory pattern
 * we provide a single common method which is responsible for object creation or instantiation 
 * of multiple different types of objects, however if these multiple different types of objects can be grouped together 
 * as a family than abstract factory pattern is used to create or instantiate these different family of objects of different
 * types.
 * 
 * Lets understand this with help of an example, we have company which creates car as well as bikes. Now within this
 * company they can create two types of car and bike i,e petrol or electric. Now different type of objects of car which can
 * be electric or petrol can be considered in one family as they are of type car only, similarly different types of objects
 * of bike i,e electric or petrol can also be grouped as one family as they are of type bike only. So if we use factory pattern
 * to create object of different type belonging to one family than its abstract factory pattern.
 * 
 * So lets understand the code.
 * 
 * The company can have two products i,e car or bike so we created two interface car and bike.
 * Car interface has drive function whereas bike interface has ride method.
 * 
 * Now there are two types of cars i,e electric cars or petrolCars so we created two different classes i,e electricCar and 
 * petrolCar both of them implements car interface and thus provide method definition to drive method of car interface.
 * 
 * Similarly there are two different types of bike  i,e electric bike or petrol bikes so we created two different classes i,e 
 * electricBike and petrolBike both of them implements bike interface and thus provide method definition to ride method of bike
 * interface.
 * 
 * Now we could have used factory pattern to create objects of different types of cars and bike i,e objects of electric car,
 * petrolCar, electric bike, petrolBike.
 * 
 * However we can see that object of electric car and petrolCar belongs to the same family of cars and similarly objects
 * of electric bike and petrol bike also belongs to same family of bike.
 * 
 * Thus we created a VehicleFactory interface which has two methods declaration i,e createCar and createBike.
 * 
 * Now we have created two different Factories i,e PetrolFactory and ElectricFactory
 * 
 * PetrolFactory implements vehicleFactory and return new PetrolCar or PetrolBike respectively.
 * Similarly electricFactory implements vehicleFactory and returns new Electric Car or ElectricBike respectively.
 * 
 * Now we have a function createFactory which based on the type passed differentiates wether it needs to return ElectricFactory
 * object or PetrolFactoryObject.
 * 
 * Based on that factory's object that particular type of car or bike can be created.
 * 
 * 
 */

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