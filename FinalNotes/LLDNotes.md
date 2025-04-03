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

<------------------------------------------#################------------------------->

**Polymorphism**

In The word polymorphism, poly means many and morphism means forms. So overall many forms.
Lets consider a example in which someone say

yes you are right

No go to right

Here the word right in different circumstances when used produced different meanings. This when 
taken into consideration in coding world forms polymorphism.

For example, the parent class is also having a method, but the base class is also having the
same method, i,e the base class has overridden the method of parent class and now if the base class object
calls the method base class method gets invoked and if super class's object calls this method then super class's
method get invoked. So the same method when called under different circumstances behaved differently this is called
polymorphism.

Polymorphism can be attained used two ways:
a) Method overriding / run time polymorphism / dynamic method dispatch
b) Method overloading / compile time polymorphism

###  Method overriding / run time polymorphism / dynamic method dispatch

Clearly the parent class is also having a add method, but the base class is also having the add
method, i,e the base class has overrided the method of parent class and now if the base class object
calls the method, base class method gets invoked and if super class's object calls this method, then super class's
method get invoked. So the same method when called under different circumstances behaved differently this is called
polymorphism.

Both methods have same declaration, same return type , same arguments however different definition

The point here to note is that let calc: Calculator = new AdvancedCalculator();
here we have considered calc as reference of Calculator which is main parent but the object which we are 
creating is of child sub class but still when we do calc.add the method of sub class only gets invoked and 
it happens due to dynamic method dispatching where at runtime compiler decides which method should be invoked
based upon the object.

```typescript
class Calculator {
    add() {
        console.log("add of parent class Calculator invoked");
    }
}

class AdvancedCalculator extends Calculator {
    add() {
        console.log("add of child class Advanced Calculator");
    }
}

let calc: Calculator = new AdvancedCalculator(); // Up casting
calc.add(); // Calls AdvancedCalculator's add() at runtime
```

### Method overloading / compile time polymorphism

Method overloading is also termed as compile time polymorphism.
Here in same class two or multiple functions has same name, return type but have different arguments.
Since at compile time only based on the number of arguments passed to invoke the function, that
specific function gets invoked and thus its compile time polymorphism.

class AdvancedCalculator {
    add(num1: number, num2: number, num3?: number) {
        if (num3) {
            return num1 + num2 + num3;
        } else {
            return num1 + num2;
        }

    }
}

let calc: AdvancedCalculator = new AdvancedCalculator();
console.log(calc.add(1, 2, 3));
console.log(calc.add(1, 2));


<------------------------------------------#################------------------------->

**Relationship**

In relationship association simply means that two classes are associated to each other, this association can be of
two types i,e aggregation and composition.

There can be two kinds of relationship like has-a and part-of or in simple words aggregation and composition respectively.

Has-a is a aggregation relationship whereas part-of is a composition relationship.

### Composition/Part-of relation:

Take example of a body and heart,lungs,brains etc.
If the body is destroyed, the heart,lungs,brain also will be destroyed. So heart, lungs, brain etc can't seize to
exist independently without a body.

```typescript
class Lungs {
    private lungCapacity: number;

    constructor(lungCapacity: number) {
        this.lungCapacity = lungCapacity;
    }

    getLungCapacity() {
        return this.lungCapacity;
    }
}

class Heart {
    private heartRate: number;

    constructor(heartRate: number) {
        this.heartRate = heartRate;
    }

    getHeartRate() {
        return this.heartRate;
    }
}

class HumanBody {
    private lungs: Lungs;
    private heart: Heart;

    constructor(lungCapacity: number, heartRate: number) {
        this.lungs = new Lungs(lungCapacity);
        this.heart = new Heart(heartRate);
    }

    getBodyDetails() {
        console.log(
            this.lungs.getLungCapacity(), this.heart.getHeartRate()
        );
    }
}

let human: HumanBody = new HumanBody(12, 90);
human.getBodyDetails();
```

In this example the lungs and heart are instances within the class HumanBody and once we create an instance
of HumanBody then only instance of lungs and heart gets created as these objects
are not passed as instances to human body but however is created internally inside it, in case humanBody instance 
gets destroyed or is deleted then these instances will also get deleted.

Such type of relationship is composition relationship.


## Aggregation/Has-a relation:

Take example of a school and a student. A school will have a student but student can exists independently as well.
If school is destroyed then student can still exist.

```typescript
class Student {
    name: string;
    constructor(name: string) {
        this.name = name;
    };

    getStudentName() {
        return this.name;
    }
}

class School {
    stud: Student;
    constructor(stud: Student) {
        this.stud = stud;
    }

    getDetails() {
        return this.stud.getStudentName();
    }
}

let student = new Student("Gaurav");
let school = new School(student);
console.log(school.getDetails());
```

Here the school class needs student instance but this student instance is not directly created inside the
school class but rather passed as an argument while creation of school object. So even if school object gets destroyed
than also student object can seize to exists.

This type of relationship is aggregation and also known as has-a relation.

So in conclusion if lifetime of one object depends on another object then it is a part-of relationship
or composition relationship, whereas in case the lifecycle of an object is not destroyed if lifecycle 
of other object is destroyed but however still they need each other, then its a has-a relationship.


<----------------########################--------------------------------------->

**Object Oriented Analysis & Design**

A software development lifecycle is composed of multiple stages like

1. Feature & system analysis
2. Object Oriented analysis and design
3. Implementation
4. Testing
5. Verification like internal demo's etc
6. Deployment

So Object oriented analysis and design is a key step in creation of a feature or building up of
a system.

Object oriented analysis involves:

a) Understanding system requirements
b) Introduction of new object & classes if needed
c) Formulating the relationship between them


In object oriented design then based upon our analysis we implement the design.

### UML:

UML refers to Unified modelling language and its a standard way for visual representation 
of system or a feature in a system which we are building that how they it will behave interact etc.
It acts as a plan or blueprint for developers, architects, and stakeholders. It helps everyone understand, 
design, and communicate how a software system works.

In UML there are different types of diagrams which are broadly categorized into two main sub category
i,e behavioral and structural diagrams.

Out of all of these diagrams present in these two category the most imp ones are

a) Use case diagram
b) Class diagram
c) Sequence diagram
d) Activity diagram


### Use case diagram

A use case diagram is a type of UML diagram which shows interaction between the actor and the system.
It helps visualize system functionality from an end-user perspective 

There are some key components in use case diagram:

a) Actor    : ![alt text](/03_ObjectOrientedAnalysis&Design/Images/Actor.png) end user or client
b) Use case  :  ![alt text](/03_ObjectOrientedAnalysis&Design/Images/UseCase.png) the functionality
c) System boundary  : the limits of the system


### Class diagram

Class diagram is most widely used depiction of the system in terms of diagram which can be understood by
the stake holder as well.

It has different types of notation like:

a) Class
b) interface, abstract class, enums
c) access modifiers.
d) Relationships


**Class:**

A class in class diagram is represented as ![alt text](/03_ObjectOrientedAnalysis&Design/Images/Classes.png)

**Abstract class:**

Abstract class is used to achieve data hiding and in class diagram is represented as ![alt text](/03_ObjectOrientedAnalysis&Design/Images/AbstractClass.png)

**Interface:**

Interface is also another way of achieving data hiding and in class diagram it is represented as ![alt text](/03_ObjectOrientedAnalysis&Design/Images/Interfaces.png)

**Access modifiers:**

All the access modifiers like public, private and protected in class diagram can be represented as ![alt text](/03_ObjectOrientedAnalysis&Design/Images/AccessModifiers.png)


**Relationship**

a) Simple association: 

It basically refers to one class having an association to another class or simply
one class is inheriting from another class i,e inheritance and in class diagram it can be represented as 
![alt text](/03_ObjectOrientedAnalysis&Design/Images/AssoctiaonOrInheritance.png)


b) Dependency:

The difference between dependency and simple association is that dependency is temporary for ex: say a car class
needs a mechanic so car class would have a dependency of mechanic only when we need to fix the car so, in class
class inside the fixCar method we need mechanic object so mechanic object is passed as reference only to this method
within the car class but not to whole car class itself else it would have been aggregation.
So such type of temp dependency in class diagram can be represented as ![alt text](/03_ObjectOrientedAnalysis&Design/Images/Dependency.png)


c) Composition or part-of relationship:

A composition or part of relationship is one in which one objects life cycle is dependant over the
other in such a way that if one seize to not exist other also wont exist. For ex: when one class creates
an instance of another class within itself. In class diagram it is represented as
(dark diamond) ![alt text](/03_ObjectOrientedAnalysis&Design/Images/CompositionRelation.png)


d) Aggregation:

A aggregation is a has-a relationship and in this one object life cycle is not dependent over other
in such a way that if one does not seize to exist that other also wont exist. For ex: one instance of one
class is passed as reference to the other class. In class diagram it can be represented as
(hollow diamond) ![alt text](/03_ObjectOrientedAnalysis&Design/Images/AggregationRelation.png)


### Sequence diagram

A sequence diagram represents the interactions between different roles/objects/classes in a sequential
manner.

Lets take an example of software development life cycle in which, first a product manager assigns task
to a developer, developer analyze and gather the requirements and revert back to Pm.

Since this task which is assigned to developer is synchronous i,e for developer he need to wait
for a task to be assigned to him to it is represented by a solid arrow.
Now this revert back of developer with updates is not synchronous or is asynchronous for PM as we don't
keep on waiting for updates from developer and halt his work , he will proceed with next work thus such
asynchronous calls are represented by dotted lines.

Now the developer once finishes off his task send update to qa as dev done so this interaction is synchronous
as tester need to wait for developer to finish before they can start testing, now once done the tester
can revert back to Developer as done which is again asynchronous as developer need not to wait for qa to finish
the task before taking up new task thus represented by dotted line.

Once qa reverts back the developer mark the task done or submit the task to PM which is again asynchronous as
PM need not to halt everything for this thing.

Now the PM sends back the feedback to dev which is synchronous as dev has to wait for the pm to send back
the feedbacks before starting to work on them.

Thus in diagram ![alt text](/03_ObjectOrientedAnalysis&Design/Images/SequenceDiagram.png)

there are three roles Product manager, Developer and QA or we can say three objects.
The vertical rectangles represents the activation bar or represents active period of object.
The dotted vertical lines connected with activation bars are the life cycle or life span of these objects during the interaction.
All synchronous interactions are represented by solid arrow where the sender waits for the
receiver to respond back whereas all asynchronous interactions where the sender does not wait for the response back from the receiver are represented by dashed arrows. 


### Activity Diagram

Activity diagram can be considered a flow chart which determines the sequence of a flow.
Lets take an example of a tv opening to closing i,e
![alt text](/03_ObjectOrientedAnalysis&Design/Images/ActivityDiag.png)

A small colored oval represents the start of the activity or initial node, so first we open a tv which is an action and
thus all the actions are represented by round border rectangle.

After that we need to enter the credentials, now this is a condition that if credentials fails or credentials
succeed and thus any logical condition is represented by a diamond.

Now taking the case if the credentials fail and the tv is not recharged than there is a task to recharge the
tv and if he does not want to recharge then we come to task of closing the tv, however if he recharge we come
back to checking credentials.

Once credentials are successful, he has to choose his profile which is a action and thus in round border
rectangle. After that there are multiple task which can happen in parallel and are considered as fork represented
by upper line inside which all parallel running task can happen.

Join refers to joining multiple parallel running task to one task and is represented by the lower horizontal line
which is joining multiple task to one single task in the diagram.

After this, the user will turn off the Tv and this will mark as the end of the activity.


<----------------########################--------------------------------------->

**SOLID Principles**

While designing any system there are some set of principles if followed leads to the application being 
more robust, modular, easier to maintain and scalable. Such principles are termed as SOLID principles
and helps in addressing challenges like code duplication, tight coupling etc.

SOLID principles are :

S -> Single responsibility Principle

O -> Open close principle

L -> Liskov substitution principle

I -> Interface segregation principle

D -> Dependency inversion principle.


## Single Responsibility principle

Single responsibility principle states that a single class should have a single responsibility and thus only
one reason to change.

Lets take an example, if we are building a website for a restaurant, so i created a class restaurant
now inside this class only i introduced logic for order handling and receipt generation say for example.

Now everything is working fine, after some time I came up with a requirement that i need to alter
the receipt generation logic as tax/gst norms got altered, so again i have to go to restaurant class and
change logic of this method in restaurant class, this can have an impact over other working functionalities and thus
again tis class needs to be tested thoroughly e-e, if in case the single responsibility principle would have been
followed here then, a separate receipt class would have been there, which we needed to modify and then only e-e testing
was needed for receipt class and overall high level testing for rest of application as always.

In this way its always better to have classes/components which serves a single responsibility.

As in below code

```typescript
class Restaurant {
    name: string;
    location: string;
    contactNumber: string;
    openTimings: string;
    closeTimings: string;
    isOpen: boolean;
    menu: Menu;
    receipt: Receipt;

    constructor() { };
}

class Menu {
    burgers: Burger;
    softDrink: SoftDrink;
}

class Burger { };

class SoftDrink { };

class Receipt { };
```

All different classes server a single responsibility of their own.


## Open closed principle

Open closed principle states that a class should be open for extension but closed for modification.
So lets suppose I have a class which serves a single responsibility principle and now a new feature needs to be 
introduced so the existing class logic should not be altered i,e this class should not be open for modifications
but however it should be open for extension.

Lets understand this with help of an example, we have a discount class which calculated discounts for various types of customers

so it for now looks like

```typescript
class Discount {
    constructor() { };

    getDiscount(spending: number, customerType: string) {
        if (customerType === "general") {
            return spending;
        } else if (customerType === "premium") {
            return spending * 0.8;
        }
    }
}
```

The problem with this design is as of now i only have two type of customer i,e general and premium and 
in case in future let us suppose one more category of customer has to be introduced say Vip then i have to alter the 
getDiscount method of Discount class by adding another if else condition but however according to openClose principle a 
class should not be open for modification.

Thus in order to solve this problem

the code should ideally be refactored as

```typescript
interface DiscountStrategy {
    applyDiscount(price: number): number;
}

class Premium implements DiscountStrategy {
    applyDiscount(price: number): number {
        return price * 0.8;
    }
}

class VIP implements DiscountStrategy {
    applyDiscount(price: number): number {
        return price * 0.7;
    }
}

class General implements DiscountStrategy {
    applyDiscount(price: number): number {
        return price;
    }
}

class Discounts {

    private strategy: DiscountStrategy;

    constructor(strategy: DiscountStrategy) {
        this.strategy = strategy;
    }

    applyDiscount(price: number) {
        return this.strategy.applyDiscount(price);
    }
}

let premium = new Discounts(new Premium());
console.log(premium.applyDiscount(100));

let vip = new Discounts(new VIP());
console.log(vip.applyDiscount(100));

let general = new Discounts(new General());
console.log(general.applyDiscount(100));
```


We have a DiscountStrategy which is a interface and provide declaration for applyDiscount method.
The all different types of customers like Premium , VIp or general classes implements this interface 
and thus override or provide their own implementation for this function applyDiscount.
 
Now the Discount class has a aggregation relationship with interface DiscountStrategy and expects an
instance/reference of DiscountStrategy in its constructor.
 
Since the task is to provide various types of customers to Discount class and type of customers can vary thus we
can't direct create a dependency of discount class over any specific type of customer like Premium , Vip etc.
Thus we have created a aggregation of Discount and discount strategy interface. We can't directly create
object from interface but however if a Class is implementing that interface than the object of that class can also
act as reference to that interface and thus we can pass different types of customers via using this concept.
 
Now the discount class has a applyDiscount method and thus this definition has invocation to specific applyDiscount method
of that class which is invoking it.
 
Now this design is following the open closed principle as if a new type of customer is introduced than we don't need 
to change or modify any existing code rather just simply create a new class and make it implement its own discount strategy.


### Liskov substitution principle

Liskov substitution principle states that if there are two classes such that one is a subclass and other is a
parent class, then we should be able to replace object of parent class with object of sub class
without breaking the functionality or If a class B is a subclass of A, 
then we should be able to use an instance of B wherever instance of A is expected.

Lets consider an example in which Liskov substitution principle is violated.

In this example liskov substitution principle is violated, 

we have a Bird class which acts as a parent class for Sparrow class and Penguin class.
Now sparrow class extends Bird class and has a method fly which is fine as sparrows can fly.
Now penguin class also extends Bird class and has a method fly which is not fine as penguin can't fly.

We have a method makeBirdsFly which takes instance of Bird or the parent class, since there are many kind of birds like 
sparrow, penguin and thus all child classes extending Birds can alo be passed as reference in makeBirdsFly
method which is expecting an reference of Bird class.

Now since here we are replacing the object of Bird class with object of specific subclass object in makeBirdsFly
method thus we are trying Liskov Substitution principle but making this substitution via substituting parent class object
with sub class object the functionality is breaking as penguins can't fly thus its a violation of LSP.


```typescript
class Bird {
    fly() {
        console.log("flying");
    }
}

class Sparrow extends Bird {
    fly() {
        console.log("sparrow is flying");
    }
}

class Penguin extends Bird {
    fly() {
        throw new Error("penguin can't fly");
    }
}

function makeBirdsFly(bird: Bird) {
    bird.fly();
}

let sparrow = new Sparrow();
makeBirdsFly(sparrow);

let penguin = new Penguin();
makeBirdsFly(penguin);
```

In order to fix the above problem the correct way is to refactor the above code as.
 
Now Birds is an abstract class which has a method declaration of makeVoice, now we have a interface fly
which provides declaration of fly method.
 
Sparrow class can extend Birds and implement fly method however penguin class can only extend Birds but
can't implement fly as penguin don't fly.
 
Now both penguin and sparrow are subclasses of Birds and our function makeBirdsFly1 expects birds which
can fly , all birds cant fly but all birds will be extending Birds class for sure and thus wherever we 
can place a Birds object we can substitute it with its sub class object and no functionality is broken and thus
This is an ideal example of liskov substitution principle.
 
```typescript
abstract class Birds {
    makeVoice() { }
}

interface fly {
    fly(): void;
}

class Sparrows extends Birds implements fly {
    fly(): void {
        console.log("sparrows can fly");
    }

    makeVoice(): void {
        console.log("sparrow voice");
    }
}

class Penguins extends Birds {
    makeVoice(): void {
        console.log("penguin voice");
    }
}

function makeBirdsFly1(birds: fly) {
    birds.fly();
}

let sp1 = new Sparrows();
makeBirdsFly1(sp1);

// let pg1 = new Penguins();
// makeBirdsPerform(pg1);   compile time error itself
```

### Interface segregation principle

Client should not be forced to implement interface whose all functionality it don't need to use.

Lets take an example in which Interface segregation principle is violated.

So in a restaurant, there are some kitchen work like, cooking, cleaning, serving.
Now we have a cook class and this cook class does cooking and cleaning so he implements the interface
kitchenTask but however serving task he don't do but since he is implementing kitchenTask interface and thus he is
forced to implement serving method.

Similarly a waiter also does kitchenTask and thus he implements kitchenTask interface but since he only does serving\
and he has implemented kitchenTask interface and thus we is forced to implement cooking and cleaning.

```typescript
interface kitchenTask {
    cooking(): void;
    cleaning(): void;
    serving(): void;
}

class Cook implements kitchenTask {
    cooking(): void {
        console.log("cooking task")
    }
    cleaning(): void {
        console.log("cleaning task");
    }
    serving(): void {
        throw new Error("Method not implemented.");
    }

}

class Waiter implements kitchenTask {
    cooking(): void {
        throw new Error("Method not implemented.");
    }
    cleaning(): void {
        throw new Error("Method not implemented.");
    }
    serving(): void {
        console.log("serves");
    }

}
```

This represents violation of interface segregation principle thus in order to fix this , the client should not be 
forced to implement any interface whose functionality it don't use and thus we can refactor it as

now we have implemented segregated interfaces and since cook needs only cleaning and cooking thus it implements
cookable and cleanable similarly waiter needs only serving so he implements servable.
Thus it now in lines with Interface segregation principle.

```typescript
interface cookable {
    cook(): void;
}

interface cleanable {
    clean(): void;
}

interface servable {
    serve(): void;
}

class Cooks implements cookable, cleanable {
    clean(): void {
        console.log("clean")
    }
    cook(): void {
        console.log("cook");
    }

}

class Waiters implements servable {
    serve(): void {
        console.log("serve");
    }
}
```


### Dependency Inversion Principle

Dependency inversion principle states that a high level module should not be directly dependent upon a low level
module and vice versa. This helps in decoupling or helps in reduction of tight coupling between modules.

Lets understand this with help of an example.

In my application to save the user we are using sql database but later there may arise a situation in which we need to
use mongo db or even some needs to be saved in mongo db and some needs to be saved in sql itself.

If we write the code like below it would be a violation of dependency inversion principle as the low level module
which is our database class is tightly coupled or is directly dependent upon the high level module or the user class
and thus if we need to change to mongo db later it would case change in the low level as well as the high level module.

```typescript
// Low level module
class Sql {
    save(data: any) {
        console.log("saving data to sql servers");
    }
}


//High level module
class User {
    sql: Sql;
    constructor() {
        this.sql = new Sql();
    }

    save(data: any) {
        this.sql.save(data)
    }
}
```

Since this is a problem and thus we need to follow dependency inversion principle , thus we will refactor the code
to something like.

```typescript
interface Database {
    save(data: any): void;
}

// low level module
class Sql1 implements Database {
    save(data: any): void {
        console.log("saving data to sql servers");
    }
}

//low level module
class MongoDb implements Database {
    save(data: any): void {
        console.log("saving data to mongodb");
    }
}

//high level module
class User1 {
    database: Database;
    constructor(database: Database) {
        this.database = database;
    }

    save(data: any) {
        this.database.save(data);
    }
}

let user = new User1(new Sql);
user.save("data");

let user1 = new User1(new MongoDb);
user1.save("data");
```
****
Now there is no direct dependency between the low level module Sql1, MongoDb and the highLevel module User1.
Instead there is a abstraction between them i,e Database interface.
 
Now this user class takes a reference of the interface and since mongo db and sql1 class both implement
this interface thus the reference of these classes can also be passed as reference for Database interface since
we can't create object of interface directly.
 
Now based on the reference passed like sql1 or mongoDb that specif save method gets invoked. 


<----------------###########################------------------------------------------->

**Design Principles**

In software world, say we need to sort items and there exists a sort method which will help us
in sorting, so some repetitive problems has standard solutions which can be reused. Lets take another example
if we are planning to build a new city than there lies some problems like garbage, sewage facility etc, all
these problems are common with introducing mostly all the new cities and thus we every time need not re invent
the wheel rather than use existing solutions.

In the same way while creating a new system, we can reuse some of the already existing design templates and these design 
templates are called as design patterns.


There exists in general 4 types of design pattern:

1) Creational design pattern
2) Structural design pattern
3) Behavioral design pattern
4) Architectural design pattern



**1) Creational design pattern**

Creational design pattern deals with multiple object instantiation of different types such that it enhances usability.
These design patterns include

  a) Factory Pattern
  b) Constructor Design Pattern
  c) SingleTon pattern
  d) Builder pattern
  e) Prototype pattern
  f) Abstract factory pattern

Ex: 

1) **Factory Pattern:**

Factory pattern is a creational design pattern and is generally used in situations where multiple objects
needs to be created of different types.

So in factory pattern there exists a common method which is responsible for creating different objects
and this method act as single point form where objects of different types can get instantiated.
Its a encapsulation as its a single place which deals with all kinds of object creation.

Lets understand this with help of an example below:

```typescript
class ShapeFactory {
    createShapes(shapes: String) {
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
```
 
We have a Shapes class which is having a draw method and a constructor.
Now this class act as parent class for various different shapes like Rectangle, circle and square.
So we have respective subClasses of Circle, rectangle and square which extends Shapes class and override the
draw method of parent Shapes class in their respective subClasses.
 
Now we have used a factory pattern in which a ShapeFactory class is responsible for creation of multiple
objects of different types.
 
So inside ShapeFactory we have a createShapes method which takes the name of the shape as argument and
then creates the respective instances based on this condition.
 
Now in the main we have first created an instance of the ShapeFactory and then is invoking the createShapes
method of it by passing the argument that which shape we need to make.
 
Now this method returns an object and thus we have an instance of the class which we needed without actually knowing
the class name and just simply using factory, thus in a way we have abstracted the object creation by hiding its 
implementations details and also encapsulated the object creation within a single class.


2) **Constructor Design Pattern:**

Constructor design pattern is simple and it deals with creation of instances of classes using constructor.
These constructor can either be a normal non parametrized constructor or a parametrized constructor.
Lets consider example below in which Human class has a non parametrized constructor whereas the Person class
which extends Human class has a parametrized constructor.
 
```typescript
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
```


3) **SingleTon pattern:**

Singleton pattern is used when we want to create a single instance of a class and it acts as an global reference 
and thus next time when we wish to use it, this same first instance only its getting used.
 
Lets understand this with an example, logger which are used to log the logs in applications generally uses only a 
single instance as we don't need to create multiple objects for it and thus we use singleton design pattern in it.

```typescript
class Logger {
    static logger: Logger;

    private constructor() {
        console.log("Logger instance created");
    };

    static getInstance() {
        if (!Logger.logger) {
            Logger.logger = new Logger();
        }
        return Logger.logger;
    }

    getLog(logs: string) {
        console.log(`Logging: ${logs}`);
    }
}

let log1: Logger | undefined = Logger.getInstance();
log1?.getLog("This is first log and object gets created as initially object was null");

let log2: Logger | undefined = Logger.getInstance();
log2?.getLog("This is second log and now new object gets created and the first object only is reused");


class Valid {
    constructor() { };
}

let v1 = new Valid();
let v2 = new Valid();
console.log(v1 === v2);

console.log(log1 === log2);
```
 
So Logger class is having an static instance variable logger of Logger class itself. The constructor is kept as private
so that no new instances can get created via user and a static method getInstance is present which is responsible for
object creation of Logger class in class this logger instance variable is null or undefined, in case its not null or 
undefined then we simply return this instance only and thus single instance is getting shared all the way across.
 
We have a getLogs method which prints the logs.

So now when we did
 
let log1: Logger | undefined = Logger.getInstance();
 
so at this time logger instance member of Logger class was null or undefined and thus a new instance of logger 
class get created as Logger.logger = new Logger();
and constructor printed "Logger instance created"
 
now when we called getLog using this reference of instance of Logger class i,e 
log1?.getLog("This is first log and object gets created as initially object was null"); 
 
"This is first log and object gets created as initially object was null" gets printed.

Now when we second time did let log2: Logger | undefined = Logger.getInstance();
 
this time logger instance was not null or undefined and thus the previous instance only gets returned 
and then we called getLog using this previous reference only
 
log2?.getLog("This is second log and now new object gets created and the first object only is reused");
 
and thus "This is second log and now new object gets created and the first object only is reused" gets 
printed.
 
This can be validated as console.log(log1 === log2); is true which means that the type as well as reference 
value of both log1 and log2 are same and its a single object only.



4) **Builder pattern**

Builder pattern is used to create complex objects in multi step process like method chaining
while the overall process of object creation remains same.
Lets understand a situation where a class constructor needs multiple parameters, thus it becomes very 
difficult to remember the sequence of these parameters during object creation and moreover if some of these 
parameters are even optional then again it can cause a complex scenario for creation of object. 
In such situations builder pattern is used.
 

In below example we are creating a car class which needs many parameters like engine, wheels, stereoSystem and 
sunroof now stereo system and sunRoof are optional parameters. We have considered only 4 parameters but lets consider 
a situation in which it needs 20 parameters and out of which some are optional as well, then it will be very difficult 
to create object of this type of class and thus we used builder pattern.
 
So we have all parameters private and we have used a private constructor in car class to enforce the use of
CarBuilder class which is a static inner nested class within car class.
 
Now this private parameterized constructor sets the parameters which are needed to build the car and has a 
getCarDetails method which gives me the details of this car.
 
Now we have a static nested class known as CarBuilder, its constructor takes are the required parameters which
the car needs to be build like in this case engine and wheels and set them to the instance variables present 
inside the static nested CarBuilder class.
 
For the optional parameters it has set methods like setStereoSystem, setSunRoof and they return this i,e the 
current instance for method chaining.
 
Now this nested static CarBuilder class also has a buildCar method which creates a new instance of car class 
using new Class, since this is nested within the car class thus it can access the car's class private constructor.

Now we can create this complex object using
 
new Car.CarBuilder("v8", 4)        // here we have passed the two mandatory parameters
.setStereoSystem(true)             // here we are using method chaining and setting the optional param stereoSystem
.setSunRoof(true)                  // // here we are using method chaining and setting the optional param stereoSystem
 
Since we are using method chaining and thus the order to set the optional parameters does not matter.

One simple question can arise here that instead of using a builder pattern, in order to solve this problem if we 
would have directly used normal Car class and provided default values for all optional parameters and simply
used setter for all the parameters then during object creation, simply we could have used setter methods of only
those parameters which we wanted to add and rest would have set by themselves to say null due to default
initialization than also the problem would have been solved.

The answer is yes the problem would have been solved but it would have lead of object state inconsistency, 
so set methods would not have been chained methods and thus execute one after the another and thus if in between
setting of two set methods if there is a race condition then objects states were inconsistent.

```typescript
class Car {
    private engine: string;
    private wheels: number;
    private stereoSystem: boolean;
    private sunRoof: boolean;

    // private constructor to enforce use of CarBuilder.
    private constructor(engine: string, wheels: number, stereoSystem: boolean, sunRoof: boolean) {
        this.engine = engine;
        this.wheels = wheels;
        this.stereoSystem = stereoSystem;
        this.sunRoof = sunRoof;
    }

    getDetails() {
        console.log(`Displaying car details `
            + '\n'
            + `Engine: ${this.engine} `
            + '\n'
            + `Wheels: ${this.wheels} `
            + '\n'
            + `Stereo: ${this.stereoSystem} `
            + '\n'
            + `Sunroof: ${this.sunRoof} `
        );
    }

    static CarBuilder = class {
        private engine: string;
        private wheels: number;
        private stereoSystem: boolean = false;
        private sunRoof: boolean = false;

        constructor(engine: string, wheels: number) {
            this.engine = engine;
            this.wheels = wheels;
        }

        setStereoSystem(isStereoSystem: boolean) {
            this.stereoSystem = isStereoSystem;
            return this;
        }

        setSunRoof(isSunRoof: boolean) {
            this.sunRoof = isSunRoof;
            return this;
        }

        buildCar() {
            return new Car(this.engine, this.wheels, this.stereoSystem, this.sunRoof);
        }
    }
}

let car = new Car.CarBuilder("v8", 4).setStereoSystem(true).setSunRoof(true).buildCar();
car.getDetails(); 
```


5) **Prototype pattern**

Prototype pattern is used when we need to do prototype inheritance.

In class we use inheritance where a sub class inherits all the property of its parent class.
In the same way if an object wants to inherits the properties from another object then there 
comes the concept of prototypical inheritance.
 
Lets take an example
 
we have a car class and it has properties like color, weight, engine and we created an car1 obj,
now let us suppose we need to create a new object of car say car2 but only want to change the color rest 
of property it should inherit from car1 obj then it such cases we use Prototype pattern and prototype inheritance
allows us to do it. So prototype pattern is used when object creation is expensive and require a lot of initializations
however we want to create a new object with starting of properties of old object only. 
 
Lets understand this:

```typescript
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
```
 
We have a prototype interface which has a method declaration clone, which soever class implements it can implement 
clone method which can help creating prototype inheritance amongst its objects.
 
So Car class is having various properties like engine, weight, color and it has a parametrized constructor which
set these instance variables from uer input. Now this Car class implements Prototype interface and provides definition
to clone method.
 
Clone method creates a shallow copy of the object.

So let c1 = new Car("v8", 1200, "blue"); creates a new object with different properties like engine, weight and color.
now when we do 
 
let c2: Car = c1.clone();
 
a shallow copy of c1 object gets returned from clone method with all properties same as old object car1.
Now we can simply change whatever properties we needs to be changed from c1 object, rest every other property will remain
same.
 
c2.color = "green";
 
now if we log c1 and c2 objects we get
 
{ engine: 'v8', weight: 1200, color: 'blue' }
{ engine: 'v8', weight: 1200, color: 'green' }
 
Thus we have accomplished prototype pattern by using prototype inheritance.


6) **Abstract factory pattern**

Abstract factory pattern resembles with factory pattern but however is built on top of it. In factory pattern, 
we provide a single common method which is responsible for object creation or instantiation of multiple different types 
of objects. However, if these multiple different types of objects can be grouped together as a family, then abstract 
factory pattern is used to create or instantiate these different families of objects of different types.  

Lets understand this with help of an example. We have a company that creates cars as well as bikes. Now within 
this company, they can create two types of cars and bikes, i.e., petrol or electric. Different types of car objects,
which can be electric or petrol, can be considered in one family as they are of type car only. Similarly, different 
types of bike objects, i.e., electric or petrol, can also be grouped as one family as they are of type bike only. So if 
we use factory pattern to create objects of different types belonging to one family, then it’s abstract factory pattern.  

So let’s understand the code. 

```typescript
interface VehicleFactory {
    createCar(): Car;
    createBike(): Bike;
}

class ElectricFactory implements VehicleFactory {
    createCar(): Car {
        return new ElectricCar();
    }
    createBike(): Bike {
        return new ElectricBike()
    }
}

class PetrolFactory implements VehicleFactory {
    createCar(): Car {
        return new PetrolCar();
    }
    createBike(): Bike {
        return new PetrolBike()
    }
}

interface Car {
    drive(): void;
}

interface Bike {
    ride(): void;
}

class ElectricCar implements Car {
    drive(): void {
        console.log("Driving electric car")
    }

}

class PetrolCar implements Car {
    drive(): void {
        console.log("Driving petrol car")
    }
}

class ElectricBike implements Bike {
    ride(): void {
        console.log("Riding electric bike")
    }

}

class PetrolBike implements Bike {
    ride(): void {
        console.log("Riding petrol bike")
    }
}

function createVehicles(type: string) {
    if (type === 'Electric') {
        return new ElectricFactory();
    } else if (type === 'Petrol') {
        return new PetrolFactory();
    } else {
        return null;
    }
}

let electricFactory = createVehicles("Electric");
let eCar = electricFactory?.createCar();
let eBike = electricFactory?.createBike();
eCar?.drive();
eBike?.ride();

let petrolFactory = createVehicles("Petrol");
let pCar = petrolFactory?.createCar();
let pBike = petrolFactory?.createBike();
pCar?.drive();
pBike?.ride();
```

The company can have two products, i.e., car or bike, so we created two interfaces, Car and Bike. 
Car interface has a drive function, whereas Bike interface has a ride method.  

Now there are two types of cars, i.e., electric cars or petrol cars, so we created two different classes, 
i.e., ElectricCar and PetrolCar. Both of them implement the Car interface and thus provide a method definition to the 
drive method of the Car interface.  

Similarly, there are two different types of bikes, i.e., electric bikes or petrol bikes, so we created two different 
classes, i.e., ElectricBike and PetrolBike. Both of them implement the Bike interface and thus provide a method 
definition to the ride method of the Bike interface.  

Now, we could have used the factory pattern to create objects of different types of cars and bikes, 
i.e., objects of ElectricCar, PetrolCar, ElectricBike, and PetrolBike.  

However, we can see that objects of ElectricCar and PetrolCar belong to the same family of cars, and similarly,
objects of ElectricBike and PetrolBike also belong to the same family of bikes.  

Thus, we created a VehicleFactory interface, which has two method declarations, i.e., createCar and createBike.  

Now, we have created two different factories, i.e., PetrolFactory and ElectricFactory.  

PetrolFactory implements VehicleFactory and returns new PetrolCar or PetrolBike respectively. Similarly, 
ElectricFactory implements VehicleFactory and returns new ElectricCar or ElectricBike respectively.  

Now, we have a function createFactory, which, based on the type passed, differentiates whether it needs to return 
an ElectricFactory object or a PetrolFactory object.  

Based on that factory’s object, that particular type of car or bike can be created.  

