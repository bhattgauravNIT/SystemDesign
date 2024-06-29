package FinalKeyWord;

/**
 * So if we make a class as final this means that no other class can make this
 * final class as their parent
 * or no other class will be able to extend this final class.
 * 
 * So if we dont want inheritance from a specific class we can make it as final
 * class.
 */

final class Calculator {
    int name;

    public void add(int n1, int n2) {
        System.out.println(n1 + n2);

    }
}

class AdvancedCalculator {

    int name;

}

public class FinalClass {

}
