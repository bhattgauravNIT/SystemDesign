package Oops.Polymorphism.RunTime;

/**
 * This is also a classic example of run time polymorphism and its known as
 * dynamic method dispacthing.
 * Lets try and undertand it with help of below example.
 * 
 * So we have 3 classes A,B & C where A is the parent of B & C .
 * All three of them has show method so basically in class B & C this show
 * method is being overrided.
 * 
 * Now we have created an object of A obj = new A() and called obj.show.
 * 
 * Simply a refernce varibale obj of type A gets created in stack which is
 * storing the mem location of a new object of A in heap.
 * This show method is present in the new object being created in heap and thus
 * Dynamic method dispatched in A is printed.
 * 
 * Now obj = new B();
 * 
 * Meaning say previously obj was having address 101 which was pointing to an
 * object of A.
 * Now after this line obj = new B();
 * 
 * obj refernce is being changed to the location of a new object of B say 102.
 * Now this show method is also present in class B thus o/p will be Dynamic
 * method dispatched in B.
 * 
 * the note point here is although initailly when we did
 * A obj = new A() the refrence varibale obj was of type A
 * and then we simply did
 * obj = new B();
 * 
 * So the type of the refernce vatibale does not matter which object in heap it
 * points to matter and thus the method of that
 * particular class gets invoked.
 * 
 * So even if we say
 * A obj1 = new B();
 * i,e create me a refernce variable obj1 of type A pointing to the memory
 * location of a new object of B in heap.
 * And then we invoke show method, the show method in object is of class B as
 * the object is of class B , thus o/p will be
 * Dynamic method dispatched in B.
 * 
 * In such kind of situations polymorphism is happening and its called as run time polymorphism.
 */

class A {
    public void show() {
        System.out.println("Dynamic method dispatched in A");
    }
}

class B extends A {
    public void show() {
        System.out.println("Dynamic method dispatched in B");
    }
}

class C extends A {
    public void show() {
        System.out.println("Dynamic method dispatched in C");
    }
}

public class DynamicMethodDispatching {
    public static void main(String[] args) {
        A obj = new A();
        obj.show();

        obj = new B();
        obj.show();

        obj = new C();
        obj.show();

        /** or */

        A obj1 = new B();
        obj1.show();

        A obj2 = new C();
        obj2.show();
    }

}
