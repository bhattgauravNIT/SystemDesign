**System Design: LLD**


**Need for Oops**

Procedural programming (a step by step approach to solve a problem like breaking the code into
procedures or functions which perform operation on data), is executed line by line and has some drawbacks 
like scalability issues and security issues as global variables can be accessed and modified by multiple 
methods thus the concept of Oops comes into picture i,e Object oriented programming.

Take example of a candle vessel, say i m making a candle from a rectangular vessel
This vessel determines the shape of the candle, if this vessel is circular than the product i,e candle
which comes out will be of shape circle and thus

we can say that candle the product is a object whereas the vessel which determines the shape
of the product is the class.

So class is nothing but a blueprint that defines the properties and behavior which the object follows, it can also
be considered as the definition of object.

whereas the candle is the object and thus object is nothing but an instance of class which follows the blue print of the class.

Now this candle can have two states i,t light up or not light up.
Similarity this candle can have two behaviors it can be lit up or it can be lit down say using a matchbox etc.

So the states are nothing but the instance members/variables of the class whereas the behavior is nothing
but the class methods/functions, these both are also associated with each object which follows the blueprint of 
this class 


```typescript
class Candle {
    isOn: boolean; // state or instance variable

    constructor() {
        this.isOn = false; // initializing with a default value
    }

    switchCandleState() { // behavior or class method
        this.isOn = !this.isOn;
    }
}
```

<-----------------------------#############################--------------------------------------->

**Classes & Objects**

Student is a class where name and roll number are the instance variables,
it has a constructor, moreover the method or behaviors are takeLeave and bunk.
We have create a new instance of Student class called s1 and assigned name to this
object s1 using s1.name = "Gaurav"using this instance we have invoked the associated behaviors/methods.

```typescript
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
```

<------------------------##############################------------------------------------------->

**Constructor**

A constructor in a class is used to initialize the object for that
class with some user defined or even predefined value.

There can be two types of constructor one parameterized and another non-parameterized.
A parameterized constructor takes arguments from user defined ways and set them to the
desired class members, whereas a non parameterized constructor does not take
any arguments and is simply can be used to set some default values every time an instance of
the class is created. 

```typescript
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
```

<------------------------##############################------------------------------------------->

**This keyword**

This keyword in Oops is used to refer to the current instance of the class.
When s1 student is called with default constructor i,e without parameters the default values
got assigned to the member variables for that object.
However when s2 object gets constructed using a parameterized constructor those values which were
passed on instantiated to the members for the second object.

Therefore this keyword helps referring to the current instance of the class.

```typescript
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
```

<------------------------##############################------------------------------------------->

**Access modifier**

There are three types of access modifiers

1. public
2. private
3. protected

Public access modifier can be accessed from anywhere i,e no restriction. 

If a member variable or say method of a class if public then it can be accessed from
same class, same package, class in same package, class in different package and anywhere.

For ex: 

In package1: we have

```typescript
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
```

Clearly if we do -----------------

```typescript
let obj1 = new C("Called from same package but different class");
console.log(obj1.name);
```

name is accessed from same class i,e line 196.
name is accessed from different class in same package i,e line 211.

Now say in package 2 we have 

```typescript
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
```

Clearly it can also be accessed from class in different package line number 249.


**Private**;

Private access modifier can be accessed only from the scope of the same class and not from anywhere else
even including the objects of the class which are outside the scope of class.
for ex: we can see the private rollNumber can only be accessed from line 200 which is a method
inside the same class.


**Protected**

Protected access modifier

If a member function or a variable is set protected than it can only be accessed from within the same class scope
or within the class scope which is a child of that class, not anywhere else even not from the object of the child class 
which are outside the scope of child class or from the objects of main class which are outside the scope of class.


<-------------------###############################------------------------------------------->

**Static & Final keyword**

Static belongs to the class and it does not belongs to the object.
So once a field is set to static there does not get created copies of it while creation of
objects rather a single instance is passed to all the objects of that class.
If it is changes this instance gets changed for all the objects or instances of the class.

A non static field belong to the object and  separate copies are shared across to all the object/instances
of the class. Since it belong to object so if changed by one object it gets changed only for that specific
object.

Final keyword is used to make a field non changeable or it can't be modified by any object of the class or even
within the same class.


```typescript
class ClassRoom {
    static capacity: number = 40;
    readonly id: number = 1; // final id: number = 1;

    constructor() { };
}

let c1 = new ClassRoom();
console.log(ClassRoom.capacity); //40
ClassRoom.capacity = 41;
console.log(c1.id); //1
console.log(ClassRoom.capacity); //41
```

<------------------------------------------#################------------------------->

**Method Overloading**

In other programming languages method overloading refers to the concept
of having multiple functions with same name but capable of accepting different arguments.

For ex, say in calculator class we want to add two number, so the add function can take 2 parameters, but
say we also want to add three numbers so we can again create a same add function but this time it
can accept three parameters, so from the object we will call add function only but however based on the
number of arguments passed that specific method of add will gets invoked.

In ts we can solve this problem by using rest operator, by passing it in function arguments it gets accepted
as a array, so we can simply parse the array and add all the input values.

```typescript
class Calculator {
    constructor() { };

    add(...nums: number[]) {
        let sm = 0;
        for (let i of nums) {
            sm += i;
        }
        return sm;
    }
}

let calc = new Calculator();
console.log(calc.add(1, 2, 5, 6));
```

<------------------------------------------#################------------------------->

**Data Hiding**

The main problem with procedural style of coding was that the data members could have been accessed without any
restrictions and there are functions which manipulate global variables therefore leading to inconsistencies
and data security issues.

Therefore in order to overcome this Oops has concept of data hiding. It refers to the case
where we restrict the data to be over written and allow access to specific methods to change it.

Data Hiding can be achieved in two ways:

1) Encapsulation:

Encapsulation refers to the concept in which all the data members and the methods
are encapsulated  within a single unit and this single unit is termed as class.

```typescript
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
```

2) Abstraction:

Abstraction refers to the concept of hiding the implementation. Lets consider the example of
an ATm machine when we go to ATM machine to take out cash we insert our card, enter pin and enter amount
rest how the machine processes, connect with bank servers does the validations and fetch us the cash is all hidden
from us.

Abstraction can be achieved in two ways:

   1) Abstract methods and classes
   2) Interface


### Abstract methods and classes:

We can understand abstraction by a simple use case that lets say, we are a service provider and have given an
option to another company that in our platform they can have that feature but how do they want to
implement that feature is on them.

So the feature which they can have on our platform but we have not provided them with any implementation
is an abstract method:

a) Should be public so that others can provide implementation to it.
b) Should be associated with an abstract keyword
c) Should only have declaration but no definition
d) Should be placed inside an abstract class

Ex:

```typescript
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
```

Abstract classes cant have any instance since there are abstract, we can consider abstract classes as
a idea or a prototype which needs to be implemented thus

a) Cant have objects
b) Can have both abstract and normal methods
c) Can't be used directly and needs to be inherited from different class.
d) Class which is inheriting it should implement all abstract methods of it.


### Interface

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

```typescript
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
```

<------------------------------------------#################------------------------->

**Inheritance**

This concept of inheriting properties from the super class is termed as inheritance.

```typescript
class Human {
    public walk: boolean = true;
    public talk: boolean;
    public sleep: boolean;

    constructor() { };
}

class Person extends Human {
    public hasKnowledge: boolean;

    constructor() {
        super();
    }
}

let P1 = new Person();
P1.walk = true;
P1.talk = true;
P1.sleep = true;
```

So Human class is the parent class and Person class is the child class or the
subClass because Person class is extending or inheriting from Human class.
 
This is called inheritance.
Now the person class will have access to all the non private members of the Human class.
 
There can be multiple type of inheritance like:
 
1) Single level:

When a child class inherits from a parent class its called single level inheritance.

2) Multi level:
 
When a child class inherits from a parent class but the parent class also 
inherits from some grandParent class its called multi-level inheritance.
  
3) Hierarchical Inheritance (1 parent-multi-child): 

When multiple sub classes inherits from same parent class its called
hierarchical inheritance.
  
4) Multiple inheritance (1 child - multi parents): 

When a single class inherits from multiple parents its called multiple 
inheritance can potentially lead to diamond problem, where if both parents are having same 
function/method then the child class will confuse that to inherit that particular function 
from which of the parent.


**Diamond problem:**

As discussed in Multiple inheritance, multiple inheritance can lead to diamond problem and there
we are not allowed to extend more than one class, however there are ways or workaround to solve this.

Ex:
1) Implement multiple interfaces.

```typescript
interface Gun {
    fire(): void;
}

interface Knife {
    stab(): void;
}

class Player implements Knife, Gun {
    stab(): void {
        console.log("stab the opponent");
    }
    fire(): void {
        console.log("fire on the opponent");
    }
}

let p1 = new Player();
p1.stab();
p1.fire()
```

So instead of extending multiple classes we simply can implement multiple interfaces and can
achieve the same.

2) Wrapper

Another way to solve diamond problem is via using wrapper classes.
So wrapper is nothing but a way to use other classes as objects.
Just like below we are using play class to wrap around Gun class and Knife class.
  
Instead of directly extending classes whose functionality we need to inherit,
we will create objects of those classes in the constructor of subclass.
Then we will invoke the functions of these parent classes through the object that we have created
of these parent classes from inside the function of the sub class.
 
The object of subclass can now invoke these method of subclass itself which internally
is invoking the function of the parent only.

```typescript
class Gun {
    fire(){
        console.log("Fire with gun to opponents");
    }
}

class Knife {
    stab(){
        console.log("stab with knife to opponents");
    }
}

class Play {
    private g1: Gun;
    private k1: Knife;

    constructor(){
     this.g1 = new Gun();
     this.k1 = new Knife();
    }

    fire(){
        this.g1.fire();
    }

    stab(){
        this.k1.stab();
    }
}

let p1 = new Play();
p1.fire();
p1.stab();
```