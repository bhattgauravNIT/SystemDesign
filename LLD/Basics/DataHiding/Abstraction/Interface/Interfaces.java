package Interface;

/**
 * So here we have an interface X and since we only want all public abstract
 * methods here thus we went for an interface
 * rather than an abstract class.
 * 
 * In interface X we also have a varibale name. Since we cant create an object
 * of an interface meaning there is nothing
 * which can get allocated inisde head memory for an interface and thus all
 * these decalred varibales has to be static i,e
 * only belonging to the interface and final.
 * 
 * Now we also have another interface Y which extends X meaning in this Y
 * interface all the abstract methods of X are
 * already declared and we have also declared another abstract method boom
 * inside Y.
 * 
 * Now we have a class A which implemnets Y ( A class could have implemented
 * multiple interfaces even).
 * But for now A is implemneting inteface Y and since Y interface is extending X
 * thus all the abstract methods of both
 * X and Y has to be imlemented by class A.
 * 
 * Now we cant create an object of any interface but we can create the refernce
 * varibale of type X or type Y.
 * Y obj = new A();
 * 
 * now this obj will have access only to those methods which are a part of Y
 * interface and since Y extends X interface
 * thus these abstract methods of X are also by default declared in Y thus obj
 * will have access to all methods of X & Y.
 * 
 * Now
 * X obj1 = new A();
 * 
 * So we are creating an refernce of inteface X which is storing the object
 * address of A in heap.
 * this obj1 will have access to all methods of interface X however not that of
 * inteface Y.
 * 
 * Reason:
 * 
 * 1. The refernce varibale obj1 is of type Interface x.
 * 2. Interface x does not extends Interface Y.
 * 
 * So obj1.boom() will not work.
 * 
 */

interface X {
    static final String name = "Gaurav";

    public abstract void show();

    public abstract void ride();

}

interface Y extends X {
    public abstract void boom();

}

class A implements Y {

    @Override
    public void show() {
        System.out.println("Show");
    }

    @Override
    public void ride() {
        System.out.println("Ride");
    }

    @Override
    public void boom() {
        System.out.println("Boom");
    }

}

public class Interfaces {
    public static void main(String[] args) {
        Y obj = new A();
        obj.boom();

        X obj1 = new A();
        obj1.show();
        obj1.ride();
        System.out.println(X.name);

    }

}
