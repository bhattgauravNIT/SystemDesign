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
a) Method overriding / run time polymorphism
b) Method overloading / compile time polymorphism



#### Method overriding / run time polymorphism

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