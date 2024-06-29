We have already talked about constructor now lets take it a little deep.

By default every constructor whether its default constructor or parametrized constructor, it always call super() by default whether
we mention it or not.

super() is a way in java of calling the constructor of the parent class.

Ex:

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
        super();
        System.out.println("In B constructor parametrized.");
    }
}

so class B extends A so if we create an object of B with default constructor the it calls super(line 24). 
The constructor of the parent which is A (default constructor) gets invoked and we gets

o/p : In A constructor
      In B constructor


Now talking about class A which is the parent , so it dont extend any class then why its constructor is also having super() by default
and whom is this super of class A refering too. So by deafult if a class is not extending any other class then it extends 
Object class and thus this super() in class A is calling the constructor of the object class.

Now we can play around with the super() , say if we pass some parameter in super inside the deafult constructor of class B.

Ex:

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
        super(n);
        System.out.println("In B constructor");
    }

    public B(int n) {
        super();
        System.out.println("In B constructor parametrized.");
    }
}

Now we create a object of B say B obj = new B();

then o/p will be In parametrized A constructor
                 In B constructor


Similary based of requirement we can toggle this super method inside the constructor. Note point is super() by default is the very
first statement inside the constructor of any class.


Lets talk abou this()

ex: 
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
        super();
        this();
        System.out.println("In B constructor parametrized.");
    }
}

lets now create an object of B using parametrized constructor.

B obj = new B(5);

o/p now will be :
In A constructor
In B constructor
In B constructor parametrized.

so this() inside the constructor is used to call other constructor of the same class.

So once we created object with parameter it calls B's class parametrized constructor which by default first calls the super
and thus invoked the parent class default constructor hence In A constructor gets printed.
After that this() invoked the default constructor of B class itself and thus In B constructor gets printed then In B constructor parametrized.
 gets printed.


 So overall super() is used to invoke the constructor of parent class where as this() is used to invoke the constructor of the
 same class.
