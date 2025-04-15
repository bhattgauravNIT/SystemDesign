/**
 * Constructor design pattern is simple and it deals with creation of instances of classes using constructor.
 * These constructor can either be a normal non parametrized constructor or a parametrized constructor.
 * 
 * Lets consider example below in which Human class has a non parametrized constructor whereas the Person class
 * which extends Human class has a parametrized constructor.
 * 
 */


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