package Datahiding.Abstraction;;

/**
 * Suppose I have a class say in this Car however in one of the methods drive I
 * am unsure
 * of the actual implementation of it and however I wish that whichever class
 * will be inheriting
 * from this Car class should take care of this method however I have only
 * declared the method , saying that
 * please take care of this method implementation on your own once you mark Car
 * class as super class.
 * 
 * This can be achieved via abstract keyword so the class in which
 * 
 * 1. We wish to declare a abstract method then mark the class as an abstract
 * class.
 * 2. We wish to declare more than one abstract method the class as an abstract
 * class.
 * 3. We dont want any abstract method to be declared but however we dont wish
 * to allow creation of any object
 * of this class then also mark it as an abstract class.
 * 
 * Now once the class is mark as abstract and in case its having an abastract
 * method then this method needs to be
 * declared as well as defined in the child class which is extending this
 * abstract parent class.
 * 
 * Some key aspects of abstraction is :
 * 
 * 1. Abstract methods can only be defined within an abstarct class.
 * 2. An abstract class need not to have strictly abstarct methods it can have normal methods even.
 * 3. We can't create object of an abstract class however its use is only for the classes which 
 * inherites this abstarct class (using extends keyword).
 * 4. The class which inherits this abstarct class should implement all of its abstarct methods.
 */

abstract class Car {
    public String name;
    public abstract void drive();

    public void playMusic() {
        System.out.println("Playing music");
    }
}

class Duster extends Car {
    public void drive() {
        System.out.println("Driving");
    }
}

public class AbstractKeyword {
    public static void main(String[] args) {
        Duster obj = new Duster();
        obj.drive();
        obj.playMusic();
    }

}
