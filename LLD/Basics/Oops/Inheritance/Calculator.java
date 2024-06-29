package Oops.Inheritance;

/**Suppose we are trying to create a kind of parent class say calculator which has all basic features of a 
 * calculator like say it can add and multiply for now.
 * 
 * Now one requirement came up from one client saying i need a calculator with all the basic features plus some of my
 * add on features like say modulo feature etc.
 * 
 * So since we already have calculator class and since client also wants all basic features , we will not be creating 
 * this basic features back again in the new advanced calculator class that we will be creating however we will be 
 * inheriting these from the parent class which is calculator.
 */

public class Calculator {
    public int add(int a, int b) {
        return a + b;

    }

    public double multiply(double a, double b) {
        return a * b;
    }
}
