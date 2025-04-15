/**
 * Clearly the parent class is also having a add method, but the base class is also having the add
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
 * 
 */

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

let calc: Calculator = new AdvancedCalculator(); // Upcasting
calc.add(); // Calls AdvancedCalculator's add() at runtime
