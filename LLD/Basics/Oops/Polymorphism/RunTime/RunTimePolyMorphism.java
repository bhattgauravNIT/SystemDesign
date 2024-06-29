package Oops.Polymorphism.RunTime;

/**This is a classic example of run time polymorphism.
 * 
 * So we have one class Calculator which is the parent/super class and we have another class AdvancedCalculator which is
 * the subClass/child class.
 * 
 * A method in the child class AdvancedCalculator is being overrided from the parent class.
 * Now once we have created an object of AdvancedCalculator and invoked add method the compiler dont know at compile
 * time whether the method of the child class itself will be getting invoked or that of its parent will get invoked.
 * 
 * The reason behind it is lets suppose the child class itself wouldn't had this add method then even if we created an object
 * of AdvancedCalculator/ child class and invoked add method there wouldn't be any error as the add method of parent class 
 * would have got invoked.
 * 
 * This descison that which add method will get invoked, one that child or that of parent is taken at run time.
 * 
 * Thus such type of scenarios fall under run time polymorphism/ late binding.
 */

class Calculator {
    public int add(int n1, int n2) {
        return n1 + n2;
    }
}

class AdvancedCalculator extends Calculator {
    public int add(int n1, int n2) {
        return n1 + n2 + 1;
    }
}

public class RunTimePolyMorphism {
    public static void main(String[] args) {
        AdvancedCalculator adv = new AdvancedCalculator();
        adv.add(1, 2);
    }

}
