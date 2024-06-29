package StaticKeyWord.StaticMethods;

class Mobile {
    int price;
    String brand;
    static String type;

    public void show() {
        System.out.println(brand + ": " + price + ' ' + type);
    }

    // public static void show1() {
    // System.out.println(brand + ": " + price + ' ' + type);
    // }

    public static void show1(Mobile obj) {
        System.out.println(obj.brand + ": " + obj.price + ' ' + type);
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
