package FinalKeyWord;

/**
 * If we have said that a varibale is final it means its a kind of constant and
 * we can't change the
 * value of this varibale once assigned.
 */

class A {
    final String name = "Gaurav";
}

public class FinalVariable {
    public static void main(String[] args) {
        A obj = new A();
        System.out.println(obj.name);
    }

}
