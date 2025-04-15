There are three types of access modifiers

1. public
2. private
3. protected

**Public access modifier can be accessed from anywhere i,e no restriction. 

If a member variable or say method of a class if public then it can be accessed from
same class, same package, class in same package, class in different package and anywhere.

For ex: 

In package1: we have

export class A {
    public name: string;
    private rollNumber: number;
    protected marks: number;

    constructor(name?: string, marks?: number, rollNumber?: number,) {
        this.name = name || "";
        this.rollNumber = rollNumber || -1;
        this.marks = marks || -1;
    }

    getName() {
        return this.name;
    }

    getRollNumber() {
        return this.rollNumber;
    }

}

class C extends A {

    constructor(name?: string, marks?: number) {
        super(name, marks);
    };

    getNameOfA(){
        return this.name;
    }

    getMarksOfA() {
        return this.marks;
    }

}

let obj1 = new C("Called from same package but different class", 90);
console.log(obj1.name);
console.log(obj1.getMarksOfA());

let objA = new A();
objA.getRollNumber();


Clearly if we do -----------------

let obj1 = new C("Called from same package but different class");
console.log(obj1.name);

name is accessed from same class i,e line 30.
name is accessed from different class in same package i,e line 46 and same package line 56.

Now say in package 2 we have 

import { A } from "../05_AccessModifier/01_Package1";

class B {
    obj: A = new A("Called from Class B of different package");

    constructor() { };

    getNameOfA() {
        console.log(this.obj.name);
    }
} 

let b = new B();
b.getNameOfA();

Clearly it can also be accessed from class in different package line number 62.



**Private;

Private access modifier can be accessed only from the scope of the same class and not from anywhere else
even including the objects of the class which are outside the scope of class.
for ex: we can see the private rollNumber can only be accessed from line 34 which is a method
inside the same class.



**Protected

Protected access modifier

If a member function or a variable is set protected than it can only be accessed from within the same class scope
or within the class scope which is a child of that class, not anywhere else even not from the object of the child class 
which are outside the scope of child class or from the objects of main class which are outside the scope of class.
