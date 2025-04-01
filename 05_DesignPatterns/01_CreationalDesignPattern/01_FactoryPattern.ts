/**
 * 
 * Factory pattern is a creational design pattern and is generally used in situations where multiple objects
 * needs to be created of different types.
 * 
 * So in factory pattern there exists a common method which is responsible for creating different objects
 * and this method act as single point form where objects of different types can get instantiated.
 * Its a encapsulation as its a single place which deals with all kinds of object creation.
 * 
 * Lets understand this with help of an example below:
 * 
 * We have a Shapes class which is having a draw method and a constructor.
 * Now this class act as parent class for various different shapes like Rectangle, circle and square.
 * So we have respective subClasses of Circle, rectangle and square which extends Shapes class and override the
 * draw method of parent Shapes class in their respective subClasses.
 * 
 * Now we have used a factory pattern in which a ShapeFactory class is responsible for creation of multiple
 * objects of different types.
 * 
 * So inside ShapeFactory we have a createShapes method which takes the name of the shape as argument and
 * then creates the respective instances based on this condition.
 * 
 * Now in the main we have first created an instance of the ShapeFactory and then is invoking the createShapes
 * method of it by passing the argument that which shape we need to make.
 * 
 * Now this method returns an object and thus we have an instance of the class which we needed without actually knowing
 * the class name and just simply using factory, thus in a way we have abstracted the object creation by hiding its implementations
 * details and also encapsulated the object creation within a single class.
 * 
 * We can see that shape factory although returns Shapes , however there is no problem in return circle or rectangle etc
 * this happens because of dynamic method dispatching or run time polymorphism. Since circle or rectangle implements Shapes
 * and they act as references to Shape as well.
 */


class ShapeFactory {
    createShapes(shapes: String): Shapes | null | undefined {
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
