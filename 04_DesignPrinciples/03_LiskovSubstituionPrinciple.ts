/**
 * Liskov substitution principle states that if there are two classes such that one is a subclass and other is a
   parent class, then we should be able to replace object of parent class with object of sub  class
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

 */

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

/**
 * 
 * In order to fix the above problem the correct way is to refactor the above code as.
 * 
 * Now Birds is an abstract class which has a method declaration of makeVoice, now we have a interface fly
 * which provides declaration of fly method.
 * 
 * Sparrow class can extend Birds and implement fly method however penguin class can only extend Birds but
 * can't implement fly as penguin don't fly.
 * 
 * Now both penguin and sparrow are subclasses of Birds and our function makeBirdsFly1 expects birds which
 * can fly , all birds cant fly but all birds will be extending Birds class for sure and thus wherever we 
 * can place a Birds object we can substitute it with its sub class object and no functionality is broken and thus
 * This is an ideal example of liskov substitution principle.
 * 
 */

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
// makeBirdsPerform(pg1);