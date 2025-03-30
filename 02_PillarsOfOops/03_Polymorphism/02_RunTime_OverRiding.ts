/**
 * Clearly the parent class is also having a add method, but the base class is also having the add
method, i,e the base class has overrided the method of parent class and now if the base class object
calls the method base class method gets invoked and if super class's object calls this method then super class's
method get invoked. So the same method when called under different circumstances behaved differently this is called
polymorphism.

Both methods have same declaration, same return type , same arguments however different definition
 * 
 */


class Calculator {
    add() {
        console.log("add of parent class Calculator invoked");
    }
}

class AdvancedCalculator {
    add() {
        console.log("add of child class Advanced calculator");
    }
}

let calc: AdvancedCalculator = new AdvancedCalculator();
calc.add();

let calc1: Calculator = new Calculator();
calc1.add();
