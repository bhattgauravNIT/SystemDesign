package Oops.Inheritance;

/**
 * So since we also need all basic features in our advanced calculator and
 * therefore we inhertied those basic features
 * from Calculator class via class AdvCalculator extends Calculator .
 * 
 * Now we can add say advanced feature of modulo in this Advcalculator class.
 * 
 * Since AdvCalculator extends Calculator meaning its a child of Calculator
 * class and thus when we create a object
 * of AdvCalculator in main this object will have access to both method of
 * AdvCalculator class itself and even that of
 * its parent class which Calculator.
 * 
 * 
 * Thus this process in which one or more class can inherit properties from a
 * parent class is termed as inheritance.
 * 
 * A parent can have multiple children so there can be multiple classes which
 * can extend Calculator class and make it as parent
 * however a single child can't have multiple parents meaning AdvCalculator
 * class cann't extend two different
 * classes at same time.
 * 
 * Lets say now we need to create a scientific calculator a third client
 * basically so we created a
 * 
 * class VeryAdvCalculator extends AdvCalculator{
 * public int pow(int x, int y) {
 * return Math.pow(x,y);
 * }
 * }
 * 
 * Now clearly this VeryAdvCalculator is extending AdvCalculator and if we see
 * AdvCalculator class then it extends
 * Calculator so in a way if calculator class is the parent then AdvCalculator
 * is the child and VeryAdvCalculator is the
 * grandchild of calculator class.
 * 
 * So eventually VeryAdvCalculator will inherit all the features of both
 * AdvCalculator and Calculator class.
 * Such type of inheritance is called as multilevel inheritance.
 */

class AdvCalculator extends Calculator {
    public int modulo(int x, int y) {
        return x % y;
    }

}

public class AdvancedCalculator {
    public static void main(String[] args) {
        AdvCalculator adv = new AdvCalculator();
        adv.add(1, 2);
        adv.multiply(3, 4);
        adv.modulo(20, 2);
    }
}
