Now since a static varibale was a class member and is common for all the objects there fore if say we have a constructor 
which we use to create objects of the class and even initialize the value of instance varibales.

Since constructor is being invoked everytime an object is created thus its not wise to initialize a static varibale from a constructor.

1.One possible way is to initialize which decleartion only .
2. Static block

class Mobile {
    int price;
    String brand;
    static String type;

    public Mobile(int price, String brand) {
        this.price = price;
        this.brand = brand;
        System.out.println("Constructor Invoked");
    }

    static {
        type = "SmartPhone";
        System.out.println("Static block invoked");
    }
}


Now every time a object is being created the constructor will be invoked and thus we can say that if n objects are getting created
n times the constructor will be invoked and statment System.out.println("Constructor Invoked") will be printed n times.

But in contrary a static block will always be called only once irrespective of any number of objects of the class being created.

The reason behind it is when we create a object of the class for the very first time , that class whose object we are creating gets loaded in
the class loader memory and this class loader will have all info about static, non static etc of the class.

Now once the class gets loaded in the class loader then irrespective of how many objects we create after the first object it will not
be unloaded/loaded again. Its a one time load on creation of first object.

Thus the static block will only be called once irrespective of the number of objects being made whereas constructor gets called n times
while creation of n number of objects.

One question arises that since class gets loaded once when we create the first object of the class, what will happen if we dont create any
object of the class , answer is simple the class will not get loaded.

But what if we want to load the class to class loader without creation of the object.

The way by which we can achieve this is Class.forName("className");

Ex: Class.forName("Mobile");
