/**
 * 
 * Encapsulation refers to the concept in which all the data members and the methods
 * are in capsulated  within a single unit and this single unit is termed as class.
 * Encapsulation is a branch of data hiding and helps in data hiding .
 * 
 */


class Student {
    private name: string;
    private rollNumber: number;

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

}