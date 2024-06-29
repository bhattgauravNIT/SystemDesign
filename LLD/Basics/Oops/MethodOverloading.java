package Oops;

/**
 * Suppose we are in a situation say we created a add funtion which takes 2
 * argumnets of int type adds
 * them and return a int type.
 * 
 * 1.Now we need to add 3 numbers say of int type only (different number of
 * parameters).
 * 2. We need to add two numbers only but not of type int say may be of type
 * long.
 * 
 * How we will achieve that we will simply create the same name add but now we
 * will make it take 3 parametrs
 * of type int instead of two for case1.
 * 
 * We will create a same method add which now will take two parameters of type
 * long and and return a long.
 * 
 * This concept of multiple methods same same method name but different
 * parameters (may be different in numbers or different
 * in datatypes) is called as method overloading.
 * 
 * In below example function add is being overloaded.
 */

class Calculate {
    public int add(int a, int b) {
        return a + b;
    }

    public long add(long a, long b) {
        return a + b;
    }

    public double add(double a, int b) {
        return a + b;
    }

    public int add(int a, int b, int c) {
        return a + b + c;
    }
}

public class MethodOverloading {
    public static void main(String[] args) {
        int a = 12;
        int b = 13;
        Calculate calc = new Calculate();
        calc.add(a, b);
        long c = 19;
        long d = 21;
        calc.add(c, d);
    }

}
