package Oops;

/**
 * So in here i have a calculator class and a AdvCalculator. AdvCalculator class
 * is child or sub class
 * of calculator class and calculator class is the parent/ super class of
 * AdvCalculator.
 * 
 * Now when we created an object of AdvCalculator class and invoked a method add
 * so this objects first searches for add method
 * in its own class lets suppose we dont find it there so it goes to parent
 * class and gets add method and perform according
 * to the add of parent class.
 *
 * However lets now suppose this add method is also present in subClass as we
 * have kind of overridden it.
 * We have created a method which is exact same as that in parent class but it
 * has a different implementation.
 * 
 * Now the object will first search for this add method in its own class found
 * that hence will perform operation
 * according to it.
 * 
 * Such cases where we override a parents class method in the child class itself
 * with a different implementation is termed as
 * Method overriding.
 */

class Calculator {
    public int add(int n1, int n2) {
        return n1 + n2;
    }
}

class AdvCalculator extends Calculator {
    public int add(int n1, int n2) {
        return n1 + n2 + 1;
    }
}

public class MethodOverriding {
    public static void main(String[] args) {
        AdvCalculator obj = new AdvCalculator();
        System.out.println(obj.add(1, 2));
    }

}
