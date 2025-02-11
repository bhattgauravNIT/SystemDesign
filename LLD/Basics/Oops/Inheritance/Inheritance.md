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
 * its parent class which is Calculator.
   Such kind of inheritance is single level inheritance.
 * 
 * 
 * Thus this process in which one or more class can inherit properties from a
 * parent class is termed as inheritance.
 *
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


 Lets talk about multiple inheritance now. 

 So lets take an example:

 class A{
    public void aFunction(){}
   public void fun(){}
 }

 class B{
    public void bFunction(){}
    public void fun(){}
 }

 class C extends A,B{
    
 }

 This class C is trying to be the child of two parents which is A and B this is called multiple inheritance and its not 
 allowed in java.

A parent can have multiple children so there can be multiple classes which can extend Calculator class and make it as parent
however a single child can't have multiple parents meaning AdvCalculator
class cann't extend two different classes at same time.

Why this happens , why multiple inheritance is not allowed in java.

So lets take an example of above only where class A is also parent say having a function fun() and a function aFunction().
Similary Class B which will also act as a parent of Class C id also having two funtion fun() and bFunction().


Say we create a object of class C and call function aFunction from it. First this child of class C will check is aFunction() is 
present in itself no it's not so then it will look at its parents clearly its parent A class is having that so it can use it.

But now say it tries to call a function fun() which is present in both of its parent which one should it choose.
This gives rise to ambiguity and this is the reason why mutiple inheritance is not allowed in java.
