<!--
The main problem with procedural style of coding was that the data members could have been accessed without any
restrictions and there are functions which manipulate global variables therefore leading to inconsistencies
and data security issues.

There fore in order to overcome this Oops has concept of data hiding. It refers to the case
where we restrict the data to be over written and allow access to specific methods to change it.

Data Hiding can be achieved in two ways:

1) Encapsulation:

Encapsulation refers to the concept in which all the data members and the methods
are in capsulated  within a single unit and this single unit is termed as class.

2) Abstraction:

Abstraction refers to the concept of hiding the implementation. Lets consider the example of
an ATm machine when we go to ATM machine to take out cash we insert our card, enter pin and enter amount
rest hpw the machine processes, connect with bank servers does the validations and fetch us the cash is all hidden
from us.

Abstraction can be achieved in two ways:

   1) Abstract methods and classes
   2) Interface


####Abstract methods and classes:

We can understand abstraction by a simple use case that lets say, we are a service provider but have given an
option to another company that in our platform they can have that feature but how do they want to
implement that feature is on them.

So the feature which they can have on our platform but we have not provided them with any implementation
so an abstract method:

a) Should be public so that others can provide implementation to it.
b) Should be associated with an abstract keyword
c) Should only have declaration but no definition
d) Should be placed inside an abstract class

Ex:

abstract class OurFeatures {

    abstract syncToGoogleCloud(): void;
    abstract syncToAWSCloud(): void;

    sayHello() {
        return "Hii welcome to Our features";
    }
}

class Feature extends OurFeatures {
    syncToGoogleCloud(): void {
        throw new Error("Method not implemented.");
    }
    syncToAWSCloud(): void {
        throw new Error("Method not implemented.");
    }
}


Abstract classes cant have any instance since there are abstract, we can consider abstract classes as
a idea or a prototype which needs to be implemented thus

a) Cant have objects
b) Can have both abstract and normal methods
c) Can't be used directly and needs to be inherited from different class.
d) Class which is inheriting it should implement all abstract methods of it.


###Interface

Interfaces can also be considered as a blueprint which a class can implement, it defined
method declarations without providing exact methods definitions.

Interface in OOps is also used to achieve data hiding or abstraction only
however its a little different from abstract classes.

Abstract classes have class structure where another class needs to inherit this abstract
class to implement the abstract features which it has provided, however we can not inherit
multiple classes and can extend only one class but this is not the case with interfaces,
a single class can implement multiple interfaces.

So both interface and abstract classes refers as an contract which needs to be full filled by 
other classes extending or implementing them respectively

interface audioFeatures {
    maxVolume: number;

    playSound(): void;
    changeBase(): void;
}

interface steering {
    rotateSteering(): void;
    tiltSteering(): void;
}

class Car implements audioFeatures, steering {
    maxVolume: number = 100;
    rotateSteering(): void {
        throw new Error("Method not implemented.");
    }
    tiltSteering(): void {
        throw new Error("Method not implemented.");
    }
    playSound(): void {
        throw new Error("Method not implemented.");
    }
    changeBase(): void {
        throw new Error("Method not implemented.");
    }
}

let c1 = new Car();
console.log(c1.maxVolume);

>