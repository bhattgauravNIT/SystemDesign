/**
 * This keyword in Oops is used to refer to the current instance of the class.
 * When s1 student is called with default constructor i,e without parameters the default values
 * got assigned to the member variables for that object.
 * However when s2 object gets constructed using a parameterized constructor those values which were
 * passed on instantiated to the members for the second object.
 * 
 * Therefore this keyword helps referring to the current instance of the class.
 * 
 */

class Student {
    name: string;
    rollNumber: number;

    constructor(name?: string, rollNumber?: number) {
        this.name = name || "defaultName";
        this.rollNumber = rollNumber || -1;
    }

    getName() {
        return this.name;
    }

    getRollNumber() {
        return this.rollNumber;
    }
}

let s1 = new Student();
console.log(s1.getName());
console.log(s1.getRollNumber());

let s2 = new Student("Gaurav", 1);
console.log(s2.getName());
console.log(s2.getRollNumber());