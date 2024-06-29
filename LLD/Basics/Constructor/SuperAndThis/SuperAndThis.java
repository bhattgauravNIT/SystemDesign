package Constructor.SuperAndThis;

class A extends Object {
    public A() {
        super();
        System.out.println("In A constructor");
    }

    public A(int n) {
        super();
        System.out.println("In parametrized A constructor");
    }
}

class B extends A {
    public B() {
        super();
        System.out.println("In B constructor");
    }

    public B(int n) {
        this();
        System.out.println("In B constructor parametrized.");
    }
}

public class SuperAndThis {
    public static void main(String[] args) {
        B obj = new B();
        System.out.println(obj);
    }
}
