<!--

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

So Human class is the parent class and Person class is the child class or the
subClass because Person class is extending or inheriting from Human class.
 
This is called inheritance.
Now the person class will have access to all the non private members of the Human class.
This concept of inheriting properties from the super class is termed as inheritance.
 
There can be multiple type of inheritance like:
 
1) Single level: When a child class inherits from a parent class its called single level inheritance.

2) Multi level: When a child class inherits from a parent class but the parent class also 
 inherits from some grandParent class its called multi-level inheritance.
  
3) Hierarchical Inheritance (1 parent-multi-child): When multiple sub classes inherits from same parent class its called
 hierarchical inheritance.
  
4) Multiple inheritance (1 child - multi parents): When a single class inherits from multiple parents its called multiple 
inheritance can potentially lead to diamond problem, where if both parents are having same 
function/method then the child class will confuse that to inherit that particular function 
from which of the parent.

Diamond problem:

As discussed in Multiple inheritance, multiple inheritance can lead to diamond problem and there
we are not allowed to extend more than one class, however there are ways or workaround to solve this.

Ex:
1) Implement multiple interfaces.

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

>