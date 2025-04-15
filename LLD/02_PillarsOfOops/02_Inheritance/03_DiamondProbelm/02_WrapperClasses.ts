/**
 * 
 * Another way to solve diamond problem is via using wrapper classes.
 * So wrapper is nothing but a way to use other classes as objects.
 * Just like below we are using play class to wrap around Gun class and Knife class.
 * 
 * Instead of directly extending classes whose functionality we need to inherit,
 * we will create objects of those classes in the constructor of subclass.
 * Then we will invoke the functions of these parent classes through the object that we have created
 * of these parent classes from inside the function of the sub class.
 * 
 * The object of subclass can now invoke these method of subclass itself which internally
 * is invoking the function of the parent only.
 * 
 */

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