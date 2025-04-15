/**
 * 
 * Student is a class where name and roll number are the instance variables,
 * it has a constructor, moreover the method or behaviors are takeLeave and bunk.
 * We have create a new instance of Student class called s1 and assigned name to this
 * object s1 using s1.name = "Gaurav"
 * using this instance we have invoked the associated behaviors/methods.
 * 
 */

class Student {
    name: string;
    rollNumber: number;

    constructor() { };

    takeLeave() {
        console.log("Taking a leave");
    }

    bunk() {
        console.log("Go & Play in ground");
    }
}

let s1 = new Student();
s1.name = "Gaurav";
console.log(s1.name);
s1.bunk();