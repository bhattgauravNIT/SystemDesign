package Oops.Polymorphism;

/**
 * Polymorphism refers to differnt behavious in different situations ex:
 * In The statment
 * 
 * Yes, you are right and please take a right. The word right has different
 * meanings and based upon the situation
 * its different.
 * 
 * So there are generally 2 types of polymorphism i,e
 * 
 * 1. Complie Time Polymorphism : (Early binding).
 * 2. Run time polymorphism: (Late binding).
 * 
 * Lets understand compile time polymorphism or Early binding with the below
 * example.
 * The example is a classic example of method overloading in which add method is
 * having different arguments .
 * 
 * Now once created an object of Calclulator and then we try and invoke the add
 * method then based on the arguments only
 * we were able to predict that which add method is going to be invoked or in
 * other words based upon the argumnets only
 * being called by object of calculator the complier will be able to understand
 * which method to be invoked and this can
 * happen at compliation time only and thus it refers to compile time
 * polymorphism or early binding.
 */

class Calculator {
    public int add(int n1, int n2) {
        return n1 + n2;
    }

    public int add(int n1, int n2, int n3) {
        return n1 + n2 + n3;
    }
}

public class CompileTimePolyMorphism {
    public static void main(String[] args) {
        Calculator cal = new Calculator();
        cal.add(1, 2);
        cal.add(1, 2, 3);
    }

}
