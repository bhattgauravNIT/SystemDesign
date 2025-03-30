/**
 * 
 * Prototype pattern is used when we need to do prototype inheritance.
 * 
 * In class we use inheritance where a sub class inherits all the property of its parent class.
 * In the same way if an object wants to inherits the properties from another object then there comes the
 * concept of prototypical inheritance.
 * 
 * Lets take an example
 * 
 * we have a car class and it has properties like color, weight, engine and we created an car1 obj,
 * now let us suppose we need to create a new object of car say car2 but only want to change the color rest of property 
 * it should inherit from car1 obj then it such cases we use Prototype pattern and prototype inheritance
 * allows us to do it. So prototype pattern is used when object creation is expensive and require a lot of initializations
 * however we want to create a new object with starting of properties of old object only. 
 * 
 * Lets consider below example:
 * 
 * We have a prototype interface which has a method declaration clone, whichsoever class implements it can implement 
 * clone method which can help creating prototype inheritance amongst its objects.
 * 
 * So Car class is having various properties like engine, weight, color and it has a parametrized constructor which
 * set these instance variables from uer input. Now this Car class implements Prototype interface and provides definition
 * to clone method.
 * 
 * Clone method creates a shallow copy of the object.
 * 
 * So let c1 = new Car("v8", 1200, "blue"); creates a new object with different properties like engine, weight and color.
 * now when we do 
 * 
 * let c2: Car = c1.clone();
 * 
 * a shallow copy of c1 object gets returned from clone method with all properties same as old object car1.
 * Now we can simply change whatever properties we needs to be changed from c1 object, rest every other property will remain
 * same.
 * 
 * c2.color = "green";
 * 
 * now if we log c1 and c2 objects we get
 * 
 * { engine: 'v8', weight: 1200, color: 'blue' }
   { engine: 'v8', weight: 1200, color: 'green' }
 * 
 * Thus we have accomplished prototype pattern by using prototype inheritance.
 * 
 * 
 */

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