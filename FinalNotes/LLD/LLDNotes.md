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
**1) Implement multiple interfaces approach**

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

**2) Wrapper class approach**

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

There are basically two types of actors i,e primary actors and secondary actors, primary actors are the ones
who interact directly with the system however the secondary actor does not directly interact with system and
can be considered as third parties like say banks for payments.

b) Use case  :  ![alt text](/03_ObjectOrientedAnalysis&Design/Images/UseCase.png) the functionality, it refers
to the actions which the actor can take on the system example login, register, search etc.


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



**Creational design pattern**

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



**Structural design pattern**


1) **Decorator pattern**

Decorator design pattern is helpful when we need to add more functionalities or more behaviors to an object
without altering its structure or its class.

This means wrapping over new functionality over the previously added functionality.

Lets try and understand this with help of a scenario.

We have a coffee shop where a basic coffee has a cost and say a description, but however if the customer wants an
add on to the coffee with more milk the cost of coffee changes and we have an add on of more milk cost over the 
basic coffee cost, now say he can also have an add on with extra sugar so the previous cost of coffee which was
basicCoffee + more milk will be added on with more sugar and thus wrapping of new behavior is happening over
existing behavior.

Consider it like creating more and more bigger circles over previous circles.

So in this scenario if we don't consider solving the problem via decorator design pattern than we need a coffee
class object for simple coffee say c1.

We need a coffee + milk class object say c2.

we need a coffee + milk + sugar class object say c3.

Here we can see that parent class can remain coffee but too many subclasses of coffee needs to be incorporated 
like coffee + milk subclass and coffee + milk + sugar subclass, and say there can be n more number of variants 
that can happen.

Now suppose there are multiple add ons in future like honey, whipped cream, normal cream, sugarFree etc, 
thus multiple permutations and combinations can happen which can affect the cost of 
coffee and thus this situation can lead to class explosion where there are too many subclasses for different 
variations.

Thus in order to handle situation of class explosion the decorator design pattern comes into picture.

Lets understand it better using coffee example itself. 

```typescript
interface Coffee {
    cost(): number;
    description(): string;
}

class BasicCoffee implements Coffee {
    cost() {
        return 100;
    }

    description() {
        return "Basic variation of coffee, Addons: ";
    }
}

class CoffeeDecorator implements Coffee {
    protected coffee: Coffee;

    constructor(coffee: Coffee) {
        this.coffee = coffee;
    }

    cost() {
        return this.coffee.cost();
    }

    description() {
        return this.coffee.description();
    }
}

class Milk extends CoffeeDecorator {
    cost() {
        return this.coffee.cost() + 20;
    }

    description(): string {
        return this.coffee.description() + ": Milk"
    }
}

class Sugar extends CoffeeDecorator {
    cost() {
        return this.coffee.cost() + 10;
    }

    description(): string {
        return this.coffee.description() + ", Sugar"
    }
}


let coffee: Coffee = new BasicCoffee();
console.log(coffee.cost());
console.log(coffee.description());

// Milk is wrapped over the basic coffee
coffee = new Milk(coffee);
console.log(coffee.cost());
console.log(coffee.description());

// Sugar is wrapped over basic coffee + milk
coffee = new Sugar(coffee);
console.log(coffee.cost());
console.log(coffee.description());
```

So we have an coffee interface which have a cost method declaration and a description method declaration.

Now we can have a basic coffee , so we created a basic coffee class it implements Coffee and thus we provide 
declaration for cost and description.

Now we can have a coffeeDecorator which will help avoiding class explosion for basicCoffee class every other new 
feature like say milk will come on top of it . Coffee decorator implements Coffee interface.

Coffee decorator class has a protected member variable of type Coffee, although coffee is an interface but 
what so ever classes implementing this interface can be considered reference to it via dynamic method dispatching.
 
The constructor of coffee decorator expects a object/reference of Coffee as we can see in the constructor.

The cost method returns the current cost of Coffee and the description returns the current description.

Now we want a Milk add on so we created a Milk class

This milk class extends coffeeDecorator and not BaseCoffee itself as we are trying to avoid class explosion 
for BasicCoffee. Now this milk is a child/subClass of CoffeeDecorator and overrides the cost and description methods of CoffeeDecorator class.

Similarly we have a sugar class. This sugar decorator class extends coffeeDecorator and not BaseCoffee itself 
as we are trying to avoid class explosion for BasicCoffee. Now this sugar decorator is a child/subClass of 
CoffeeDecorator and overrides the cost and description methods of CoffeeDecorator class.

Now once we create an instance of Coffee using

let coffee: Coffee = new BasicCoffee();
the current cost is the cost of basic coffee and current description is the basic description.

However if the user wants to have a milk addOn he can simply do

coffee = new Milk(coffee);
now the cost of coffee has added up with new cost from milk and same with description.

now if the user wants to have an add on of sugar over this, it means that he is having an add on over basic coffee + milk
and not simply basic coffee and thus now the cost will change based on currentInstance cost + new add on cost of sugar

This first when we created simply instance of coffee via basic coffee our cost was 100.
When we had an addon with milk it became 120.

Now when we had an add on with sugar it became 120+ 10 = 130

This means in decorator pattern each decorator wraps the previous decorator and each decorator keeps wrapping 
the object with new wrapping over the previous wrapping and not the original entity which we started from.

Another classic example of Decorator design pattern is that in node.js we use app.use()

Say we did app.use(Cors)
app.use(Helmet)

so cors functionality gets wrapped over helmet as well.


2) **Facade pattern**

Facade design pattern is used to simplify a larger and complex system of classes, so instead of dealing
with multiple classes to perform an action, they can interact with one single facade class, so facade class
acts as a wrapper which hides the complexities associated with individual classes and provide a simpler 
unified approach to the problem.

Lets understand this with help of an example,

say we have a home theater so home theater can have multiple things like amplifier, projector, dvd, 
sound system etc. Now say we want to watch a movie so ideally what we need to do is turn on dvd, 
turn on projector, turn on sound system, turn on amplifier and play dvd. These are all the task associated 
with watching a movie, similarly if we want to turn off
home theater than we have to turn off dvd, turn off projector, turn off sound system, turn off amplifier, 
these are all the task associated with turing off a home theater.

So instead of user interacting with all these classes like amplifier, projector, dvd, sound system we can 
create a facade class which interacts and take care of all these things whereas the user just interacts 
with this single facade class.

This is the intuition of facade design pattern.

Lets understand it better with code.

```typescript
class Amplifier {
    turnOff() {
        console.log("Turning amplifier off");
    }

    turnOn() {
        console.log("Turning amplifier on");
    }
}

class Projector {
    turnOff() {
        console.log("Turning projector off");
    }

    turnOn() {
        console.log("Turning projector on");
    }
}

class Dvd {
    turnOff() {
        console.log("Turning Dvd off");
    }

    turnOn() {
        console.log("Turning Dvd on");
    }

    play() {
        console.log("Playing dvd");
    }
}

class SoundSystem {
    turnOff() {
        console.log("Turning sound system off");
    }

    turnOn() {
        console.log("Turning sound system on");
    }
}

class HomeTheaterFacade {

    private amplifier: Amplifier;
    private projector: Projector;
    private dvd: Dvd;
    private soundSystem: SoundSystem;

    constructor(amplifier: Amplifier, projector: Projector, dvd: Dvd, soundSystem: SoundSystem) {
        this.amplifier = amplifier;
        this.projector = projector;
        this.dvd = dvd;
        this.soundSystem = soundSystem;
    }

    playHomeTheater() {
        this.amplifier.turnOn();
        this.projector.turnOn();
        this.dvd.turnOn();
        this.soundSystem.turnOn();
        this.dvd.play();
    }

    turnOffHomeTheater() {
        this.amplifier.turnOff();
        this.projector.turnOff();
        this.dvd.turnOff();
        this.soundSystem.turnOff();
    }
}

let amplifier: Amplifier = new Amplifier();
let projector: Projector = new Projector();
let dvd: Dvd = new Dvd();
let soundSystem: SoundSystem = new SoundSystem();
let homeTheater: HomeTheaterFacade = new HomeTheaterFacade(amplifier, projector, dvd, soundSystem);
homeTheater.playHomeTheater();
homeTheater.turnOffHomeTheater();
```

So we have classes like amplifier, projector, dvd , sound system and all classes have its own set of functionalities
like they can be turned off , turned on , played etc.

Instead of the user directly interacting with these classes in order to use HomeTheater we have created a facade of 
HomeTheater and this deals with handling all these classes internally like playing a homeTheater needs
amplifier to be turned on, projector to be turned on, dvd to be turned on and sound system to be turned on and
dvd to be played.

In this way we have limited the interaction of user to facade class only which takes cares of everything and
provided a simpler unified approach to the problem.


3) **Adapter design pattern**

Lets suppose we have two incompatible interface that can't wok together, so we place an adapter in between, 
the role of this adapter is to make these two interfaces communicate and work together.

Lets consider a real world scenario I have a 3 pin charger and a 2 pin socket, this 3 pin charger can't fit 
in the 2 pin socket and thus we need a adapter in between.

So adapter design pattern bridges the gap between two incompatible interfaces and is best suited for integration
of third party services with our existing code.

Lets understand this with help of an example.

Say we are a paymentGateway provider, at this time we can process standard transaction via say banks however
now the client say amazon which is using our payment gateway now wants paypal payments also to happen through our
gateway so paypal is a third party library and we cant change anything in that library 
paypal has provided us with api to integrate with our code, clearly our code and this third party paypal can't 
interact with each other directly thus we need a adapter in between so that our gateway can support paypal 
payments as well.

Lets understand this with help of code.

```typescript
interface PaymentGateway {
    processPayment(amount: number): void;
}

class PaypalPayment {
    makePaymentUsingPaypal(amount: number) {
        console.log(`making payment of ${amount} through paypal`)
    }
}

class PaypalAdapter implements PaymentGateway {

    payPal: PaypalPayment;

    constructor(payPal: PaypalPayment) {
        this.payPal = payPal;
    }

    processPayment(amount: number): void {
        this.payPal.makePaymentUsingPaypal(amount);
    }
}

let paypalPayment: PaypalPayment = new PaypalPayment();
let paymentGateway: PaymentGateway = new PaypalAdapter(paypalPayment);
paymentGateway.processPayment(20);
```

We have an e commerce site which uses our payment gateway and we have provided him with our 
interface PaymentGateway. He wants us to incorporate the payPal payment in our gateway.

So we have paymentGateway interface which has method declaration of processPayment.

Now The paypal which is a third party has provided us with Paypal payment and it has
a function makePaymentUsingPaypal which does its job of making payment.

Our interface can't interact with PaypalPayment directly as for that PayPayment needs to implement our interface 
PaymentGateway which they won't do as being gateway provider for payment its a library which can't eb changed and 
its our responsibility to in corporate 3rd party in our code.

Now the e-commerce will make payment through our gateway this means they will simply create an instance of PaymentGate
only in their code.

Now we create an PaypalPaymentAdapter which implements our interface thus it can act as reference of PaymentGateway
even for our main e-commerce client and this adapter can have an instance of payPalPayment which can call the main
makePaymentUsingPayPal of our third party inside the processPayment method which it will override of our PaymentGateway
interface.

This is adapter design pattern


4) **Bridge design pattern**

Bridge patterns are simple are easy to understand, let understand this situation in which we have multiple
brands of Tv like say, samsung, sony, Mi etc. There exists a single remote which is capable of working with
any Tv brand, the client has access to remote and wants to use this remote for multiple Tv brands, here the bridge
pattern will come into picture.

A bridge pattern provides a bridge between abstraction and implementation, in this case remote is abstraction
and implementation is tv so we are trying to decouple abstraction from implementation.

Lets understand it better with help of an example:

```typescript
interface Tv {
    turnOn(): void;
    turnOff(): void;
    changeChannel(id: number): void;
}

class SamsungTv implements Tv {
    turnOn(): void {
        console.log("Turning samsung Tv on")
    }
    turnOff(): void {
        console.log("Turning samsung Tv off")
    }
    changeChannel(id: number): void {
        console.log(`Changing channel of Samsung Tv to channel number: ${id}`)
    }
}

class SonyTv implements Tv {
    turnOn(): void {
        console.log("Turning sony Tv on")
    }
    turnOff(): void {
        console.log("Turning sony Tv off")
    }
    changeChannel(id: number): void {
        console.log(`Changing channel of sony Tv to channel number: ${id}`)
    }
}

abstract class Remote {
    protected tv: Tv // this acts as a bridge for remote with different Tv's

    public constructor(tv: Tv) {
        this.tv = tv;
    }

    abstract turnOn(): void;
    abstract turnOff(): void;
    abstract setChannel(id: number): void;
}

class BasicRemote extends Remote {

    constructor(tv: Tv) {
        super(tv);
    }

    turnOn(): void {
        this.tv.turnOn();
    }
    turnOff(): void {
        this.tv.turnOff();
    }
    setChannel(id: number): void {
        this.tv.changeChannel(id);
    }
}

let samsungTv: Tv = new SamsungTv();
let sonyTv: Tv = new SonyTv();
let basicRemote: BasicRemote = new BasicRemote(samsungTv);
basicRemote.turnOn();
basicRemote.turnOff();
basicRemote.setChannel(2);

basicRemote = new BasicRemote(sonyTv);
basicRemote.turnOn();
basicRemote.turnOff();
basicRemote.setChannel(2);
```

There can be multiple brands of Tv like samsung, Sony ,Lg, Mi etc, so first we created a Tv interface and every brand
can provide its own set of implementations that how it wishes to work. Every Tv brand has its own implementation and
this is what we refer by implementation in the phrase "decouple abstraction from implementation"

Now remote should not directly depend on any of implementation thus decouple will happen.
In oder to achieve this we created a abstract class remote which takes a reference of Tv interface, since all the brands
which implements this interface can be considered as reference of Tv, thus we can see that remote is not directly
depending upon any specif implementation and thus we have provided a bridge between implementation and abstraction.

This bridge is basically this reference of Tv which is marked in abstract class remote.

Now a basic Remote can extend this abstract class and take a reference of any Tv
and can call methods of Tv interface using the this reference which will internally call the specific 
implementation.

The user can create an instance of basic remote and can pass any reference of any Tv brand, and it will work fine
with it.


5) **Composite design pattern**

Composite design pattern is used where there is some kind of hierarchy for ex say a tree structure which we 
needs to represent amongst classes.

So a tree structure looks like 

                              root
                     |                    |
                   child                 child
           |                 |        |
          child            leaf       leaf
     |           |
    leaf         leaf

Now the root in composite design pattern is known as component and the child is known as composite. Leaf 
remains as leaf.

Lets understand composite design pattern better with help of a situation, suppose we need to design a
folder structure where there will be a main root folder, then multiple folders can be a part of it.

A folder can contain a file or can contain multiple folders again inside it.
A folder in this case is composite whereas a file is a leaf.

If we need to design such situation we can use composite design pattern.

Lets understand this with help of code.

```typescript
interface FileComponentSystem {
    showDetails(): void;
}

class Files implements FileComponentSystem {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    showDetails(): void {
        console.log(`File details are : ${this.name}`)
    }
}

class Folder implements FileComponentSystem {
    name: string;
    components: FileComponentSystem[];

    constructor(name: string) {
        this.name = name;
        this.components = [];
    }

    showDetails(): void {
        console.log(`Folder: ${this.name} \n`);
        for (let detail of this.components) {
            detail.showDetails();
        }
    }

    addComponent(component: FileComponentSystem) {
        this.components.push(component);
    }

    removeComponent(component: FileComponentSystem) {
        this.components = this.components.filter((val) => val !== component);
    }
}

let f1 = new Files("1.png");
let f2 = new Files("2.png");
let f3 = new Files("3.png");
let f4 = new Files("4.png");
let f5 = new Files("5.png");
let f6 = new Files("6.png");
let f7 = new Files("7.png");

let folder1 = new Folder("MyImages");
folder1.addComponent(f1);
folder1.addComponent(f2);
folder1.addComponent(f3);
folder1.addComponent(f4);
folder1.addComponent(f5);
folder1.addComponent(f6);
folder1.addComponent(f7);

let eduf1 = new Files("Maths.pdf");
let eduf2 = new Files("Cs.pdf");
let eduf3 = new Files("Ece.pdf");
let eduf4 = new Files("Civil.pdf");

let folder2 = new Folder("Eduction");
folder2.addComponent(eduf1);
folder2.addComponent(eduf2);
folder2.addComponent(eduf3);
folder2.addComponent(eduf4);

let root = new Folder("root");
root.addComponent(folder1);
root.addComponent(folder2);

console.log("Before removing folder")
root.showDetails();

root.removeComponent(folder2);

console.log("After removing folder")
root.showDetails();
```

So we wish to create a file/Folder system . A folder/file system can have multiple folders or multiple files or 
even single folder or single file etc nested within itself.

So we create a FileComponentSystem interface which is created to create reference of a file or a folder as individual
file and folder classes will be implementing it.

Now we have a file class which implements FileComponentSystem and thus can act as a reference of FileComponentSystem.
Now a file can have a name and thus this name is passed as parameter to constructor by user and is set to instance 
variable of the file class. The file class also provides implementation of showDetails method which show the fileName.

Now we can also have a Folder class, a folder can have a name and it can have multiple files or even multiple folders 
within it and thus it will have a array of FileComponentSystem, It implements the FileComponentSystem interface and 
thus can act as a reference for it.

Now it provides declaration to showDetails method which iterate over the array of FileComponentSystem, every element of 
FileComponentSystem is either a File reference or a Folder reference and thus we can call showDetails method over it.

Now we can add FileComponentSystem reference to Folder class using addComponent which pushes FileComponentSystem 
reference to the array, we can even remove a FileComponentSystem reference from the array using removeComponent using 
this.components = this.components.filter((val) => val !== component);

So now we can test it saying we have 7 files of myImages like 1.png etc which are added to a folder named "images" using

let f1 = new Files("1.png");
let f2 = new Files("2.png");
let f3 = new Files("3.png");
let f4 = new Files("4.png");
let f5 = new Files("5.png");
let f6 = new Files("6.png");
let f7 = new Files("7.png");
let folder1 = new Folder("MyImages");
folder1.addComponent(f1);
folder1.addComponent(f2);
folder1.addComponent(f3);
folder1.addComponent(f4);
folder1.addComponent(f5);
folder1.addComponent(f6);
folder1.addComponent(f7);

Similarly we have say 4 eduction pdf's like Math.pdf etc and we add it to folder Education

let eduf1 = new Files("Maths.pdf");
let eduf2 = new Files("Cs.pdf");
let eduf3 = new Files("Ece.pdf");
let eduf4 = new Files("Civil.pdf");

let folder2 = new Folder("Eduction");
folder2.addComponent(eduf1);
folder2.addComponent(eduf2);
folder2.addComponent(eduf3);
folder2.addComponent(eduf4);

Now we can add both these folders in a main root folder using
let root = new Folder("root");
root.addComponent(folder1);
root.addComponent(folder2);
Similarly we can perform other operations also

Thus we have designed a folder system using Composite design pattern, lets understand how it is following a 
composite design patter,
FileComponentSystem acts as main root of tree and a common interface or entry point in tree and can also be 
understood as component.
File class acts as a leaf as no new hierarchy develops from it and this its a leaf and it implements 
FileComponentSystem.

Folder class acts as composite as it contains array of FileComponentSystem which can be both file or folder and 
thus resembles hierarchy and also implements FileComponentSystem.


6) **Flyweight design pattern**

Flyweight design pattern is used when we need to reduce memory usage and improve performance while dealing with 
large number of mostly similar objects. It does so by sharing largely all common features of an object instead of 
creating duplicates again and again.

Its generally used when we have n number of mostly similar objects where n is very large.

The properties / features which remains common amongst objects are know an intrinsic state, where as the properties 
which differ are Extrinsic state.

Lets understand this with help of a situation.

I have a code editor and in the code editor multiple characters can be typed, however these different characters can have different font
styes like say different font family, different font size, different font color.

We need to implement such type of functionality, here there can be huge number of characters and it might be possible 
that many characters can be using the same font style i,e font size, font family, color so if we use fly weight pattern 
to design this, it will help in memory usage and we don't need to repeat multiple objects with mostly all same properties. 

These properties which can remain same in this case are font size, font family, color thus they will be our intrinsic state, whereas the characters will differ thus they are Extrinsic state.

Lets understand this fly weight design pattern better with help of code.

```typescript
interface FontStyle {
    fontFamily: string;
    fontSize: number;
    color: string;
    apply(char: string): void;
}

class Font implements FontStyle {
    fontFamily: string;
    fontSize: number;
    color: string;

    constructor(fontFamily: string, fontSize: number, color: string) {
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.color = color;
    }

    apply(char: string): void {
        console.log(`Applying font to ${char} , Font Family: ${this.fontFamily}, Font Size: ${this.fontSize}, Color: ${this.color}`);
    }
}

class FontFactory {
    private static fontMap: Map<string, Font> = new Map<string, Font>();

    static getFonts(fontFamily: string, fontSize: number, color: string): Font | undefined {
        let key = `${fontFamily}_${fontSize}_${color}`;
        if (!this.fontMap.has(key)) {
            console.log(`Creating a new font: Font Family: ${fontFamily}, Font Size: ${fontSize}, Color: ${color}`)
            this.fontMap.set(key, new Font(fontFamily, fontSize, color));
        }
        return this.fontMap.get(key);
    }
}

class Documents {
    private characters: { char: string, font: FontStyle | undefined }[] = [];

    addCharacters(char: string, fontFamily: string, fontSize: number, color: string) {
        const font = FontFactory.getFonts(fontFamily, fontSize, color);
        let obj = { char, font };
        this.characters.push(obj);
    }

    render(): void {
        for (const { char, font } of this.characters) {
            font?.apply(char);
        }
    }
}

let doc = new Documents();
doc.addCharacters("H", "Arial", 12, "Black");
doc.addCharacters("e", "Arial", 12, "Black");
doc.addCharacters("l", "Arial", 12, "Black");
doc.addCharacters("l", "Arial", 12, "Black");
doc.addCharacters("o", "Times New Roman", 14, "Blue");
doc.addCharacters("!", "Times New Roman", 14, "Blue");

console.log("Rendering document");
doc.render();

```

The main idea here is that if in case we found same intrinsic properties being used again by some other character 
for which we have already created an object for we don't create a new object rather pass the same reference of older 
object to this new character. In case we are encountering these intrinsic properties for the first time then we create a new object and pass its reference to this character.

In order to achieve this we have a FontFactory which takes care of object creation.
Our fontFactory has a static map of string -> object of Font.
This map since is static remains same for all objects of FontFactory.

The key can be formulated via let key = `${fontFamily}_${fontSize}_${color}` i,e string concatenation of intrinsic properties.
Now in this map if this key does not exists this means we are encountering these intrinsic properties for the first 
time and thus we will create a new object of Font and will place it against this key in map.

So in our use case doc.addCharacters("H", "Arial", 12, "Black");
we encounter key "Arial_12_Black" for first time and thus created a new object of Font using these properties and 
placed in map so our map looks like 

Map: {

"Arial_12_Black": Font { fontFamily: 'Arial', fontSize: 12, color: 'Black' }

}

Now when we encounter doc.addCharacters("e", "Arial", 12, "Black");

so this key "Arial_12_Black" was already present in map and thus we don't create a new object of font rather pass the old
reference of the previous object only to this.

This happens inside getFonts function of FontFactory.

Now let come back to FontStyle interface this interface has three intrinsic states i,e fontFamily, fontSize and color 
and has a declaration of apply method.

We have a flyweight class called Font which implements this interface and is needed for object creation via help of 
intrinsic states only i,e fontFamily, fontSize and color which are passed as arguments to its constructor.

This flyweight class implements applyMethod which apply these properties to the character.

Now lets see how our client can use it so we have a documents class, this documents class has a private characters array 
characters: { char: string, font: FontStyle | undefined }[] = [];

it is an array of object where each object has the character which we want to apply the font on and its corresponding 
mapping with the Font class object. Since font class implements font style thus we can say that each object has the 
character which we want to apply the font on and its corresponding mapping with the FontStyle reference.

This array gets formulated in addCharacters method of documents class, 
when we add a character with specific font it calls FontFactory'S getFont method, if the same fontStyle is 
already present in memory it gives back the object of Font class, this object is mapped with the character and 
pushed to array, if it finds the font provided by user for first time, the fontFactory creates the object and pass 
that reference to it and this new object gets mapped to this character along with this new object reference.

The characters array looks like:

[
  {
    char: 'H',
    font: Font { fontFamily: 'Arial', fontSize: 12, color: 'Black' }
  },
  {
    char: 'e',
    font: Font { fontFamily: 'Arial', fontSize: 12, color: 'Black' }
  },
  {
    char: 'l',
    font: Font { fontFamily: 'Arial', fontSize: 12, color: 'Black' }
  },
  {
    char: 'l',
    font: Font { fontFamily: 'Arial', fontSize: 12, color: 'Black' }
  },
  {
    char: 'o',
    font: Font { fontFamily: 'Times New Roman', fontSize: 14, color: 'Blue' }
  },
  {
    char: '!',
    font: Font { fontFamily: 'Times New Roman', fontSize: 14, color: 'Blue' }
  }
 ]

for the given set of use cases. 

Now the render method inside the document class will simply iterate over the characters array and will call the 
apply method of Font class which it has over ridden through interface FontFamily and will apply the font family, 
font size and color respectively to the char.

Thus flyweight pattern helps memory optimization by only creating objects whose intrinsic state is being encountered 
for the first time.


7) **Proxy design pattern**

Proxy design pattern is used when we need to substitute the main object with another proxy object,
the role of this proxy object can may be to provide access to this main object, or to delay the object
creation etc. In general we can say that the role of this proxy object is to perform some pre determined operation
before or after the main object's functionality.

Lets understand this with help of an example, say I have a file system such that only specific role
users can open the file. In this situation we provide a proxy object to the main file and check if the
user is authorized to open the file or not, if not he simply will not be given access to open the file.

Lets see the code for this

```typescript
interface FileOperations {
    openFile(): void;
}

class FilesSystem implements FileOperations {
    fileName: string;

    constructor(fileName: string) {
        this.fileName = fileName;
    }

    openFile(): void {
        console.log(`opening file ${this.fileName}`);
    }
}

class FileSystemProxy implements FileOperations {
    private fileName: string;
    private role: string;
    private fileSystem: FilesSystem | null = null;

    constructor(fileName: string, role: string) {
        this.fileName = fileName;
        this.role = role;
    }

    openFile() {
        if (this.role !== "admin") {
            console.log(`The user is not authorized to open the file ${this.fileName}`);
        } else {
            if (!this.fileSystem) {
                this.fileSystem = new FilesSystem(this.fileName);
            }
            this.fileSystem.openFile();
        }
    }
}

let fileSystem: FileOperations = new FileSystemProxy("systemDesign.pdf", "admin");
fileSystem.openFile();

fileSystem = new FileSystemProxy("systemDesign.pdf", "guest");
fileSystem.openFile();
```

So we have a interface FileOperations which has a method declaration for openFile now we have a fileSystem 
which is the main object and it implements the interface FileOperations.
It takes a fileName and open it in openFile method, however since we need role based authorization on this main
object therefore we will be using proxy design pattern, and thus we have created a FileSystemProxy class which
also implements FileOperations, in this case it needs a fileName as well as user role to operate , it provides
definition to openFile method and checks if the user is authorized it he is not authorized, it will simply
return with unauthorized however if its authorized this means it needs to call openFile method of mainObject like
file system and thus we need a reference of fileSystem also in in this proxy class and using it we called
the main objects openFile method. 

Note that with

if (!this.fileSystem) {
        this.fileSystem = new FilesSystem(this.fileName);
}

we did an lazy loading that whenever an instance of file system is required then only it will create it.



**Behavioral design pattern**

Behavioral design pattern helps improving the communication between objects while maintaining loose
coupling between them.

ex: 

1. **Observer Design pattern**

Observer design pattern is a behavioral design pattern which helps in improving the communication between the
objects.

Let's consider a real life example, we went to a store and asked for a specif product but that product was not 
available at that time, so we asked the store owner to inform us or let us know once its available.

Now consider multiple people like me waiting to be notified by the store owner about the product availability.
One way is that I keep on visiting the store every day to get an update, in the same way all n people who want the 
product should do it, but this is difficult and not possible. Another way is the once the product is available the
shop owner notifies us and all the rest people who were willing to get that product and its a ideal way.

This what's happen in Observer design pattern.


Lets understand it better with coding example, I am the weather central station who takes data from satellite etc, 
now there are multiple websites for weather prediction, multiple apps for wether prediction which takes data from me and
show it in their websites or apps.

Now suddenly we in weather central station got to know that in 1 hour a earthquake is about yo hit , so its my 
responsibility to immediately notify them.

One way for them to be notified is that they keeps on making api calls to my system after every 10 mins to get 
the current weather forecast data, but its an overhead for them to continuously keep making api calls in regular interval. Similarly
its an overhead for me to keep continuously responding to n number of api calls after every 10 mins, rather than 
this approach, as soon as I have a new update i will update all the n observers of the weather data on my own. This is 
where observer design pattern comes into picture.

So me who want to notify others is a publisher or a subject
The people who needs the updates or my clients are the subscribers or the observers.


Lets understand this with help of code:

```typescript
interface Observer {
    update(): void;
}

class WeatherSubject {
    private observers: Observer[] = [];

    addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    removeObserver(observer: Observer) {
        this.observers = this.observers.filter((val) => val !== observer)
    }

    notify() {
        for (const clients of this.observers) {
            clients.update();
        }
    };
}

class WeatherCentralHub extends WeatherSubject {
    private humidity: number;
    private temp: string;
    private willRain: boolean;

    constructor(humidity: number, temp: string, willRain: boolean) {
        super();
        this.humidity = humidity;
        this.temp = temp;
        this.willRain = willRain;
        this.updateChangedData();
    }

    private updateChangedData(): void {
        this.notify();
    }

    getHumidity(): number {
        return this.humidity;
    }

    getTemp(): string {
        return this.temp;
    }

    getWillRain(): boolean {
        return this.willRain;
    }
}

class WetherForCastingApp implements Observer {
    weatherCentralHub: WeatherCentralHub;

    constructor(weatherCentralHub: WeatherCentralHub) {
        this.weatherCentralHub = weatherCentralHub;
        this.weatherCentralHub.addObserver(this)
    };

    update(): void {
        console.log(`
        Todays weather is having ${this.weatherCentralHub.getHumidity()} 
        humidity with ${this.weatherCentralHub.getTemp()}
        temperature and there are will be rain ${this.weatherCentralHub.getWillRain()}`)
    }
}

class WetherForCastingWebsite implements Observer {
    weatherCentralHub: WeatherCentralHub;

    constructor(weatherCentralHub: WeatherCentralHub) {
        this.weatherCentralHub = weatherCentralHub;
        this.weatherCentralHub.addObserver(this)
    };

    update(): void {
        console.log(`
        Todays weather is having ${this.weatherCentralHub.getHumidity()}
        humidity with ${this.weatherCentralHub.getTemp()}
        temperature and there are will be rain ${this.weatherCentralHub.getWillRain()}`)
    }
}



let weatherCentralHub = new WeatherCentralHub(21, "32 Degree Celsius", false);
let wetherForCastingApp: Observer = new WetherForCastingApp(weatherCentralHub);
let wetherForCastingWebsite: Observer = new WetherForCastingWebsite(weatherCentralHub);
weatherCentralHub.notify();
```

WeatherCentralHub is the subject or publisher but there can be a scenario that there are multiple publishers even so
we have created a class WeatherSubject which can be extended by all the weather publishers/subjects.

Our class WeatherSubject has list of observers whom we need to notify regarding the updates.
Now observers like weather app or weather website are placed under one hood via Observer interface which has a method 
declaration update.

Now  WeatherSubject class has addObserver which can add new observers to the list and a method remove observer too which
can remove observer from the list.

It has a notify method which is used to notify all the observers.Now since every observer like WetherForCastingApp or
WetherForCastingWebsite are reference of ObserverInterface thus they have to implement it and provide definition 
to update method. 

Now this notify method which is used to notify all the observers in Weather subject will iterate over list
of all observers and will call update method on these observers.

The class WeatherCentralHub is a publisher/subject and it extends WeatherSubject, this class takes data like
humidity, temp and willRain which say may be coming from satellite.

Now as soon as data coming from satellite on WeatherCentralHub changes or in our scenario for replication whenever
an object of WeatherCentralHub gets created then it means there is a change in data and thus the constructor of this 
class invokes method updateChangedData which in turns calls for notify method of its superclass.

Now on every observer class like WetherForCastingApp its constructor needs an instance of its subject i,e WeatherCentralHub
in our case and the constructor also invoke the addObserver method of instance of WeatherCentralHub to add this particular
observer to list of observers.


2. **Template Design pattern**

In order to understand template design pattern, lets consider a scenario.
We need to make tea and we need to make coffee, so lets write down the steps to make tea and to make coffee
respectively.

Tea:

Boil water
AddTea
Add condiments for tea
Pour in cup
serve
 
Coffee:

Boil water
Brew
Add condiments for coffee
Pour in cup
Serve

Now if we see there are some methods which remains common in both the process, i,e Boil water, Pour in cup and Serve
however some methods depend upon each individual tea or coffee preparation like AddTea in tea prep, add condiments of 
tea like cardamon etc whereas in coffee they are brew the coffee, add condiments of coffee like coffee powder etc.

In such type of scenario one way to solve the problem is to use separate classes for tea and coffee and define all the 
methods individually in each class however it violates DRY principle i,e Do not repeat yourself. As the methods which 
are common in both of the preparations will be repeated in both the classes and this is simply code duplication.

Another way is to create one interface and declare these common methods there and make each class implement it and provide 
method definition to each common method, but these common methods have same definition too in each of the class thus 
again its code repetition and thus we need to create an abstract class where these common methods will be provided with 
method definition as well and make the individual classes extend this abstract class and get the common methods from this,
however they can individually provide the uncommon or class specific methods in their own classes.

```typescript
abstract class Process {
    boilWater(): void {
        console.log("Boiling water");
    }

    pourInCup(): void {
        console.log("Pouring in cup");
    }

    server(): void {
        console.log("serving");
    }
}

class Tea extends Process {
    addTea(): void {
        console.log("Adding tea");
    }

    addCondiments() {
        console.log("adding milk, sugar and cardamon");
    }
}

class Coffee extends Process {
    brewCoffee(): void {
        console.log("Adding coffee");
    }

    addCondiments() {
        console.log("adding milk, sugar and coffee powder");
    }
}

let tea: Tea = new Tea();
tea.boilWater();
tea.addTea();
tea.addCondiments();
tea.pourInCup();
tea.server();

let coffee: Coffee = new Coffee();
coffee.boilWater();
coffee.brewCoffee();
coffee.addCondiments();
coffee.pourInCup();
coffee.server();
```


3. **Iterator Design pattern**

Iterator design pattern is used to iterate over underlying collection of a class without letting
the client know regarding the underlying structure of the collection like array, set, map which should be 
iterated.

Lets take an example;

We have a library which can store books, now suppose the client wants to get details of all the books
which are stored in library, in case we have the getDetails method in library and it returns an array containing
the books, then the client will get back the array and then they have to traverse over it.

Now suppose some fine day we decide to change the inner data structure from array to something else, then client also
has to change their whole traversal process code and if there are n number of clients than it will be very difficult for
all the n clients to change their traversal logic so in such situations the iterator design pattern comes into picture.

In iterator design pattern we have 

1. An iterator interface which will have two method declaration 
   hasNext()
   next()

2. Container which in an interface and have method declaration 
   getIterator()

Now in iterator interface hasNext should be of return type boolean as it tells if the
iterable is having another element or not, left to iterate. The next() method has a return type of the type
or iterator which we are traversing since at time of declaration we don't know so we consider it generic type i,e T but
it can be null as well in case it don't have a next and thus its T or null.

interface Iterators<T> {
 hasNext(): boolean;
 next(): T | null;
}

Now the container has getIterator method which give me an iterator as name suggest so it should have a return type
Iterator and since Iterator expects a datatype thus we consider it also generic so return type is Iterator<T>

 interface Container<T> {
 getIterator(): Iterators<T>;
}

Now we have a book class which has a name and a getName method simple.
We have a library class which will store all the books, so we have an array of Books and at time
of library instantiation we initialize this array as empty array i,e lazy loading. 

Now it has a add book which takes a book type and add it to the books array.
Since user will be interacting with library only and thus they need an iterator so Library class
implements Container interface which has a getIterator and thus Library class will override this method.
Thus getIterator has to return an Iterator reference.

Now Book class don't implement Iterator interface and thus it can't act as a reference and thus we
crated an BookIterator class now this class implements Iterator and thus over ride hasNext and next method.
bookIterator class now expects array of Book which needs to be iterated , for iteration we kept a class
instance i initialized to 0.

hasNext check the current value of i, if its less than the length of books array it returns true else false.
next return the current array of indexed element and increment i.

Now coming back to getIterator method of Library class which should return a reference of Iterator,
so now it return new instance of BookIterator as pass the array of books in its constructor.
Now the client can create instance of library.
Add multiple books to it.

Then can call getIterator of library class which returns BookIterator.
Since book Iterator has has next method so till it has next we keep iterating
using iterator.next which returns an book object and thus we can get Details of the book.
So in summary, in order to create an iterator Design we need
1) An iterator interface with hasNext and next method
2) An container interface to getIterator

```typescript
interface Iterators<T> {
    hasNext(): boolean;
    next(): T | null;
}

interface Container<T> {
    getIterator(): Iterators<T>;
}

class Book {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }
}

class BookIterator implements Iterators<Book> {
    i = 0;
    books: Book[];

    constructor(books: Book[]) {
        this.books = books;
    }

    hasNext(): boolean {
        return this.i < this.books.length;
    }

    next(): Book | null {
        return this.hasNext() ? this.books[this.i++] : null;
    }
}

class Library implements Container<Book> {
    private books: Book[];

    constructor() {
        this.books = [];
    }

    addBooks(book: Book) {
        this.books.push(book);
    }

    getIterator() {
        return new BookIterator(this.books);
    }
}

let library = new Library();
library.addBooks(new Book("DSA"));
library.addBooks(new Book("PSA"))
library.addBooks(new Book("GSA"))
library.addBooks(new Book("SSA"))
library.addBooks(new Book("QSA"))

let iterator: Iterators<Book> = library.getIterator();
while (iterator.hasNext()) {
    let book: Book | null = iterator.next();
    console.log(book?.getName());
}
```

4. **Strategy Design pattern**

Strategy pattern helps us to bind multiple algorithms together in our unit at run time i,e through
dynamic method dispatching. Once the client mentions the strategy/algorithm through which he needs that
work to be done, the work gets done by that strategy.

Lets consider an example.

We are a payment gateway and we can provide payments through multiple ways like
credit card, paypal, net banking , upi etc.

So there are all the strategies through which payment can be done , thus we will design this system in such a
way that if later a new payment mode is introduced then even we will respect all the SOLID principles.

Now all different strategies of payment can be through credit card, net banking and paypal as of now
we create three class each of each strategy.

Now we bind them together using an interface Payment for dynamic method dispatching.

Now the paymentGateway takes an reference of one of these strategies through the client and call the
makePayment accordingly for the respective strategy.  


```typescript
interface Payment {
    makePayment(amount: number): void;
}

class CreditCard implements Payment {

    makePayment(amount: number): void {
        console.log(`Making payment of ${amount} through Credit card`)
    }

}

class Paypal implements Payment {

    makePayment(amount: number): void {
        console.log(`Making payment of ${amount} through paypal`)
    }

}

class NetBanking implements Payment {

    makePayment(amount: number): void {
        console.log(`Making payment of ${amount} through net banking`)
    }

}

class PaymentGateway {
    private payment: Payment;

    setPaymentStrategy(payment: Payment) {
        this.payment = payment;
    }

    makePayment(amount: number) {
        this.payment.makePayment(amount);

    }
}

let pg = new PaymentGateway();
pg.setPaymentStrategy(new CreditCard());
pg.makePayment(20);

pg.setPaymentStrategy(new NetBanking());
pg.makePayment(100);

pg.setPaymentStrategy(new Paypal());
pg.makePayment(300);
```

5. **Chain of responsibility Design pattern**

As the name is suggesting, chain of responsibility so here we are concerned with a linked list
kind of structure , so different classes are chained to each other.

Lets understand it with help of an example, we are customer service provider and client can raise tickets or
incidents in our system. In case the ticket priority is low , the client can provide 
the ticket to the support agent, if in case the ticket priority is medium the client can either directly provide
the ticket to supervisor or he can follow the chain in which he assigns to the support person who then sends it to
his supervisor.

If the ticket priority is high, the client can directly send it to manager or he can follow the chain than he can
assign to support person, so sends to supervisor and then he send to manager.

We can see that if he follows the process of assigning and contacting the support person regarding a high priority
ticket, which needs to reach to manager but other classes also should know about the ticket so its a chain, and such
problems can be solved by chain of responsibility pattern. 

Lets understand it better with help of code

```typescript
abstract class SupportHandler {
    nextHandler: SupportHandler;

    setNextHandler(nextHandler: SupportHandler) {
        this.nextHandler = nextHandler;
    }

    abstract handleRequest(priority: string): void;
}

class SupportAgent extends SupportHandler {

    handleRequest(priority: string): void {
        if (priority === "low") {
            console.log("Request is handled by Support Agent");
        } else {
            if (this.nextHandler) {
                this.nextHandler.handleRequest(priority);
            }
        }
    }
}

class SupportSuperVisor extends SupportHandler {

    handleRequest(priority: string): void {
        if (priority === "medium") {
            console.log("Request is handled by Support supervisor");
        } else {
            if (this.nextHandler) {
                this.nextHandler.handleRequest(priority);
            }
        }
    }
}

class Manager extends SupportHandler {

    handleRequest(priority: string): void {
        if (priority === "high") {
            console.log("Request is handled by Manager");
        } else {
            if (this.nextHandler) {
                this.nextHandler.handleRequest(priority);
            }
        }
    }
}

let agent: SupportHandler = new SupportAgent();
let supervisor: SupportHandler = new SupportSuperVisor();
let manager: SupportHandler = new Manager();
agent.setNextHandler(supervisor);
supervisor.setNextHandler(manager);

agent.handleRequest("low");
agent.handleRequest("medium");
agent.handleRequest("high");
```

We have an abstract class supportHandler which has a reference to its own to implement dynamic method dispatching
as Agent, supervisor and manager will all extend this and thus will come under one hood.

This abstract class has a abstract method handleRequest which will be overrided by each individual class who extends it.
It also has a method setNextHandler which is to set or formulate the next node in the chain.

Now we have a agent class and it extends SupportHandler. It overrides the handleRequest method and if the priority
is low he himself handles the request else if there exists a next handler he sends it to the next handler.

Similar process is executed by Supervisor and manager for tickets of priority medium and hard respectively.

Now the client can interact with this system as

let agent: SupportHandler = new SupportAgent();
let supervisor: SupportHandler = new SupportSuperVisor();
let manager: SupportHandler = new Manager();
agent.setNextHandler(supervisor);
supervisor.setNextHandler(manager);

agent.handleRequest("low");
agent.handleRequest("medium");
agent.handleRequest("high");
