package StaticKeyWord.StaticVariables;

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

        /** obj1.type = "SmartPhone"; */
        
        Mobile.type = "SmartPhone";

        Mobile obj2 = new Mobile();
        obj2.price = 1200;
        obj2.brand = "Samsung";

        /** obj2.type = "SmartPhone" */
        ;
        Mobile.type = "SmartPhone";

        /** obj1.type = "ChangedType" */
        ;
        Mobile.type = "ChangedType";

        obj1.show();
        obj2.show();
    }
}
