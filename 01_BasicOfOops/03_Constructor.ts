/**
 * 
 * A constructor in a class is used to initialize the object for that
 * class with some user defined or even predefined value.
 * 
 * There can be two types of constructor one parameterized and another non-parameterized.
 * A parameterized constructor takes arguments from user defined ways and set them to the
 * desired class members, whereas a non parameterized constructor does not take'
 * any arguments and is simply can be used to set some default values every time an instance of
 * the class is created.  
 * 
 */

class Student {
    private name: string;
    private rollNumber: number;

    // constructor() { };

    constructor(name: string, rollNumber: number) {
        this.name = name;
        this.rollNumber = rollNumber;
    }

    getName() {
        return this.name;
    }

    getRollNumber() {
        return this.rollNumber;
    }

    takeLeave() {
        console.log("Taking a leave");
    }

    bunk() {
        console.log("Go & Play in ground");
    }
}

let s1 = new Student("Gaurav", 1);
console.log(s1.getName());
console.log(s1.getRollNumber)
s1.bunk();