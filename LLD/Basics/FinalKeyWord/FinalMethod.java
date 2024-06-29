package FinalKeyWord;

/**
 * So if a method is made final say in class Calculator
 * then no other class which is inheriting this Calculator class can override
 * this method.
 * 
 * Thus we stop method over riding via making a method final.
 */

class Calculator {

    public final void show() {
        System.out.println("Author Bhatt Baba");
    }

    public void add(int n1, int n2) {
        System.out.println(n1 + n2);
    }
}

class AdvancedCalculator extends Calculator {
    // public void show() {
    // System.out.println("Author Farzi");
    // }
}

public class FinalMethod {

}
