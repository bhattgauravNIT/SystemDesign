So Lets consider example to understand static keyword in varibales.

class Mobile {
    int price;
    String brand;
    static String type;

    public void show() {
        System.out.println(brand + ": " + price + ' ' + type);
    }
}

public class StaticVariables {
    public static void main(String[] args) {
        Mobile obj1 = new Mobile();
        obj1.price = 1200;
        obj1.brand = "Apple";
        obj1.type = "SmartPhone";

        Mobile obj2 = new Mobile();
        obj2.price = 1200;
        obj2.brand = "Samsung";
        obj2.type = "SmartPhone";

        obj1.type = "ChangedType";

        obj1.show();
        obj2.show();
    }
}

In class mobile we have a static instance varibale which is type. Every other instance varibale will be unique for every object being created 
for mobile class and thus in heap memory every object of mobile being created will have its price and brand instance varibale however its not
the case with static keyword varibale which is type in this case.

This static instance varibale will be created at a special memory location inside heap only and will be common for all the objects of the class.
So if any object changes the value of this common varibale for all the objects , this value will also gets altered for all the objects of that class.

In the above example obj1 has its type as SmartPhone and even obj2 has its type as SmartPhone however when we changed obj1.type to 
ChangedType this will be impacted and changed for all the objects of the mobile class.

Since a static varibale is not object dependent and is simply a class member therefore we can simply access a static varibale using 

className.VaribaleName ex: Mobile.type = "SmartPhone"

One imp point here is if we look at show method , inside it we are using all three instance varibale i,e price, brand and static varibale type.

So we can use a static varibale inside a non static method.