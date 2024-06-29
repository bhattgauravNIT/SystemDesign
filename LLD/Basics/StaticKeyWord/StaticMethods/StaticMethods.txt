Lets talk about static methods in java. 

Just like static varibales , static methods are also something which does not belong to the object however it belongs to the class.
So in order to invoke them we dont need objects of the class.

Lets talk about why out main is static i,e say I have a class demo

class Demo {
    public static void main(String[] args){}
}

why this main method is static. So main method is the first method which gets called to run the application. Suppose its not static this
means in order to invoke the main from where the application starts we needed to create a object of Demo class and then invoke main , but 
since main is the first method from where the execution starts how could you have created an object first of demo and then called main.
This is the reason why main method is static.

Lets talk about an example:

class Mobile {
    int price;
    String brand;
    static String type;

    public void show() {
        System.out.println(brand + ": " + price + ' ' + type);
    }

    public static void show1() {
       System.out.println(brand + ": " + price + ' ' + type);
    }
}

public class StaticMethods {
    public static void main(String[] args) {
        Mobile obj1 = new Mobile();
        obj1.price = 1200;
        obj1.brand = "Apple";

        Mobile obj2 = new Mobile();
        obj2.price = 1200;
        obj2.brand = "Samsung";

        Mobile.type = "SmartPhone";

        Mobile.show1(obj2);

    }
}

So in above Mobile class there are 2 instance varibales price, brand , one static varibale type which is common for all the objects of Mobile
class and is class varibale. 
We have one instance method show and in show we have used static variable type and there is no issue or error.

      The reason why we can use static varibales inside non static methods is because a non static method will always be invoked by
      an object and since the static varibale is common to all the objects thus this object from which this non static method is being
      invoked will also be having this type (static)varibale and thus it dont cause a issue.

Now in contrary if we try and use non static varibales inside a static method it causes problem lets understand with example.
In above Mobile class we have a static method show1 which uses 2 non static/ instance variables brand and price and it causes problem.

Lets understand why this happens. 

A static method i,e show1() will not be invoked by any object and its a class method. So since these two instance varibales brand and price
are non static and thus property of object how does the static method i,e show1() knows what are the values of these two properties and
thus it causes a problem.

We can have a alternative to use these instance varibales indirectly inside static method via:

class Mobile {
    int price;
    String brand;
    static String type;

    public void show() {
        System.out.println(brand + ": " + price + ' ' + type);
    }

    public static void show1(Mobile obj) {
        System.out.println(obj.brand + ": " + obj.price + ' ' + type);
    }
}

making the static method accept an object as an argumnet and then using this object we can take out the values of these two instance 
varibales.