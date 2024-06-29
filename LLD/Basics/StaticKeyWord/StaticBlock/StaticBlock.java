package StaticKeyWord.StaticBlock;

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

public class StaticBlock {
    public static void main(String[] args) throws ClassNotFoundException {
        Mobile m1 = new Mobile(1200, "APPLE");
        Mobile m2 = new Mobile(1200, "Samsung");
        Class.forName("Mobile");
        System.out.println(m1.price + m2.price);
    }

}
